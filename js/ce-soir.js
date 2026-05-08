// js/ce-soir.js

document.addEventListener("DOMContentLoaded", async () => {
  // 1. DÉTECTION DU JOUR (En mode 3 lettres pour LibreOffice)
  const jours = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const aujourdHui = new Date();
  const nomDuJour = jours[aujourdHui.getDay()]; // ex: "vendredi"
  const prefixeJour = nomDuJour.substring(0, 3).toLowerCase(); // Récupère "ven", "lun", "mar"...

  const optionsDate = { weekday: "long", day: "numeric", month: "long" };
  document.getElementById("date-ce-soir").textContent =
    "Soirée du " + aujourdHui.toLocaleDateString("fr-FR", optionsDate);

  // 2. CONFIGURATION DES CSV
  const chainesActives = [
    {
      id: "tf1",
      logo: "./photo/logo-TF1.jpg",
      fichierCSV: "./csv/tf1_semaine_2mai.csv",
    },
    {
      id: "m6",
      logo: "./photo/logo-M6-removebg-preview.png",
      fichierCSV: "./csv/m6_annuel2025-2026.csv",
    },
    {
      id: "tfx",
      logo: "./photo/logo-TFX.jpg",
      fichierCSV: "./csv/tfx_annuel2025-2026.csv",
    },
    {
      id: "tmc",
      logo: "./photo/logo-TMC.jpg",
      fichierCSV: "./csv/tmc_annuel2025-2026.csv",
    },
    {
      id: "lci",
      logo: "./photo/logo-LCI.jpg",
      fichierCSV: "./csv/lci_annuel2025-2026.csv",
    },
  ];

  function parseCSVLine(text, separator) {
    let result = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      let c = text[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === separator && !inQuotes) {
        result.push(cur);
        cur = "";
      } else {
        cur += c;
      }
    }
    result.push(cur);
    return result;
  }

  async function extrairePrimeTimeDuCSV(fichierCSV, prefixeRecherche) {
    try {
      const reponse = await fetch(fichierCSV);
      if (!reponse.ok) return [];

      const buffer = await reponse.arrayBuffer();
      const decoder = new TextDecoder("iso-8859-1");
      const csvBrut = decoder.decode(buffer);

      const lignes = csvBrut.split("\n");
      if (lignes.length < 2) return [];

      const separateur = lignes[0].includes(";") ? ";" : ",";
      let indexColonneHeure = -1;

      // On cherche l'en-tête (LUN, MAR, VEN...) en sautant de 2 en 2 pour éviter les sous-titres
      for (let l = 0; l < Math.min(3, lignes.length); l++) {
        if (!lignes[l]) continue;
        const entetes = parseCSVLine(lignes[l], separateur);

        for (let i = 0; i < entetes.length; i += 2) {
          // String(...) protège contre le bug "undefined.replace" des cases vides de LibreOffice
          let nomCol = String(entetes[i] || "")
            .toLowerCase()
            .replace(/[^a-z]/g, "");
          if (nomCol.includes(prefixeRecherche)) {
            indexColonneHeure = i;
            break;
          }
        }
        if (indexColonneHeure !== -1) break;
      }

      if (indexColonneHeure === -1) return [];

      const indexColonneTitre = indexColonneHeure + 1;
      const programmesDuSoir = [];

      // On parcourt les lignes à partir de 2
      for (let i = 2; i < lignes.length; i++) {
        if (lignes[i].trim() === "") continue;

        const cellules = parseCSVLine(lignes[i], separateur);

        const valHeure = cellules[indexColonneHeure];
        const valTitre = cellules[indexColonneTitre];

        // Sécurité absolue : on vérifie que la case existe bien et n'est pas vide
        if (valHeure && valTitre && String(valTitre).trim() !== "") {
          let chaineHeure = String(valHeure).trim().toUpperCase();
          let titreProg = String(valTitre).trim().replace(/^"|"$/g, "");

          let heure = parseInt(chaineHeure, 10);
          let minutes = 0;

          let separateurHeure = chaineHeure.includes("H")
            ? "H"
            : chaineHeure.includes(":")
              ? ":"
              : null;
          if (separateurHeure) {
            let parts = chaineHeure.split(separateurHeure);
            if (parts[1]) minutes = parseInt(parts[1].trim(), 10);
          }

          if (!isNaN(heure)) {
            // PRIME TIME
            if (
              (heure === 20 && minutes >= 45) ||
              heure === 21 ||
              heure === 22 ||
              (heure === 23 && minutes < 26)
            ) {
              programmesDuSoir.push({
                h: chaineHeure,
                titre: titreProg,
              });
            }
          }
        }
      }
      return programmesDuSoir;
    } catch (erreur) {
      return [];
    }
  }

  // 5. AFFICHAGE
  const container = document.getElementById("grille-ce-soir");
  if (!container) return;
  container.innerHTML = "";

  for (const chaine of chainesActives) {
    // On cherche par exemple "ven" dans le CSV de la chaine
    const programmes = await extrairePrimeTimeDuCSV(
      chaine.fichierCSV,
      prefixeJour,
    );
    let programmesHTML = "";

    if (programmes.length === 0) {
      programmesHTML =
        "<p style='color:#94a3b8; font-size:0.85rem; padding:10px; text-align:center;'>Programmes non disponibles</p>";
    } else {
      programmes.forEach((prog) => {
        programmesHTML += `
                  <div class="prog-item">
                    <span class="prog-time">${prog.h}</span>
                    <span class="prog-title">${prog.titre}</span>
                  </div>
                `;
      });
    }

    const cardHTML = `
            <div class="tv-card">
              <div class="tv-card-header">
                <img src="${chaine.logo}" alt="Logo ${chaine.id.toUpperCase()}" onerror="this.style.display='none'">
              </div>
              <div class="tv-card-body">
                ${programmesHTML}
              </div>
            </div>
        `;

    container.innerHTML += cardHTML;
  }
});
