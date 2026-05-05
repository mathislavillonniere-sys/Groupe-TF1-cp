// ========================================================
// 1. GESTION DES ONGLETS (AFFICHAGE DES CHAÎNES)
// ========================================================
function openChannel(event, channelId) {
  const contents = document.querySelectorAll(".channel-detail, .channel-card");
  contents.forEach((content) => content.classList.remove("active"));

  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  const boxToShow = document.getElementById(channelId);
  if (boxToShow) boxToShow.classList.add("active");

  if (event && event.currentTarget) event.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const chaineDemandee = params.get("chaine");

  if (chaineDemandee) {
    const btnToClick = document.querySelector(
      `.tab-btn[onclick*="${chaineDemandee}"]`,
    );
    if (btnToClick) btnToClick.click();
  }

  checkLiveProgram();
  setInterval(checkLiveProgram, 60000);
});

// ========================================================
// 2. BASE DE DONNÉES DES GRILLES
// ========================================================
const baseDeDonneesDirect = {
  "2026-05-02": "../../csv/tf1_semaine_2mai.csv",
  "2026-05-10": "../../csv/tf1_semaine_10mai.csv",
  "2026-05-18": "../../csv/tf1_semaine_18mai.csv",
};

function obtenirFichierCsvActuel() {
  const maintenant = new Date();
  let fichierActuel = null;
  let datePlusProche = new Date(0);

  for (const dateStr in baseDeDonneesDirect) {
    const dateSemaine = new Date(dateStr);
    if (dateSemaine <= maintenant && dateSemaine > datePlusProche) {
      datePlusProche = dateSemaine;
      fichierActuel = baseDeDonneesDirect[dateStr];
    }
  }
  return fichierActuel;
}

// ========================================================
// 3. LE DIRECT INTELLIGENT (ADAPTÉ À TON FICHIER CSV)
// ========================================================
async function checkLiveProgram() {
  try {
    const cheminCSV = obtenirFichierCsvActuel();

    if (!cheminCSV) {
      afficherDefaut();
      return;
    }

    const response = await fetch(cheminCSV);
    if (!response.ok) throw new Error("CSV introuvable");

    // --- LE DÉCODEUR MAGIQUE (Anti-Losanges) ---
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder("iso-8859-1");
    const textCSV = decoder.decode(buffer);
    const lignes = textCSV.split("\n");

    const maintenant = new Date();

    // --- LOGIQUE DU JOUR TÉLÉ (Démarre à 6h du matin) ---
    let jourSemaineReel = maintenant.getDay();
    let dateColonne = new Date(maintenant.getTime());

    if (maintenant.getHours() < 6) {
      jourSemaineReel = jourSemaineReel === 0 ? 6 : jourSemaineReel - 1;
      dateColonne.setDate(dateColonne.getDate() - 1);
    }

    let colHeure, colProg;
    if (jourSemaineReel === 0) {
      colHeure = 12;
      colProg = 13;
    } else {
      colHeure = (jourSemaineReel - 1) * 2;
      colProg = colHeure + 1;
    }

    const programmesDeLaJournee = [];

    // --- LECTURE LIGNE PAR LIGNE ---
    for (let i = 2; i < lignes.length; i++) {
      if (!lignes[i].trim()) continue;

      // Lecteur de CSV intelligent (évite les bugs si un titre contient une virgule)
      let inQuotes = false;
      let cur = "";
      let colonnes = [];
      for (let c of lignes[i]) {
        if (c === '"') inQuotes = !inQuotes;
        else if (c === "," && !inQuotes) {
          colonnes.push(cur);
          cur = "";
        } else cur += c;
      }
      colonnes.push(cur);

      if (colonnes.length > colProg) {
        let heureBrute = colonnes[colHeure] ? colonnes[colHeure].trim() : "";
        let titre = colonnes[colProg]
          ? colonnes[colProg].trim().replace(/^"|"$/g, "")
          : "";

        if (heureBrute && titre) {
          let heurePropre = heureBrute.replace(/h/i, ":").replace(/\s/g, "");
          const parts = heurePropre.split(":");
          const heures = parseInt(parts[0], 10) || 0;
          const minutes = parseInt(parts[1], 10) || 0;

          const dateDuProgramme = new Date(dateColonne.getTime());
          dateDuProgramme.setHours(heures, minutes, 0, 0);

          // CORRECTION 1 : De minuit à 5h59, c'est techniquement le lendemain !
          if (heures < 6) {
            dateDuProgramme.setDate(dateDuProgramme.getDate() + 1);
          }

          programmesDeLaJournee.push({
            titre: titre,
            dateDebut: dateDuProgramme,
          });
        }
      }
    }

    // CORRECTION 2 : On trie chronologiquement (car le CSV est en vrac !)
    programmesDeLaJournee.sort((a, b) => a.dateDebut - b.dateDebut);

    // --- RECHERCHE DU PROGRAMME ACTUEL ---
    let programmeTrouve = false;

    for (let j = 0; j < programmesDeLaJournee.length; j++) {
      const progActuel = programmesDeLaJournee[j];
      const debut = progActuel.dateDebut;

      let fin;
      if (j + 1 < programmesDeLaJournee.length) {
        fin = programmesDeLaJournee[j + 1].dateDebut;
      } else {
        fin = new Date(debut.getTime() + 2 * 60 * 60 * 1000);
      }

      // EST-CE QU'ON EST EN DIRECT SUR CE PROGRAMME ?
      if (maintenant >= debut && maintenant < fin) {
        const dureeTotale = fin - debut;
        const tempsPasse = maintenant - debut;
        const pourcentage = Math.min((tempsPasse / dureeTotale) * 100, 100);

        const formatHeure = (d) =>
          String(d.getHours()).padStart(2, "0") +
          ":" +
          String(d.getMinutes()).padStart(2, "0");

        document.querySelector(".live-program").textContent = progActuel.titre;
        document.querySelector(".progress-fill").style.width =
          pourcentage + "%";

        const startElem = document.querySelector(".live-time-start");
        const endElem = document.querySelector(".live-time-end");
        if (startElem) startElem.textContent = formatHeure(debut);
        if (endElem) endElem.textContent = formatHeure(fin);

        programmeTrouve = true;
        break;
      }
    }

    if (!programmeTrouve) afficherDefaut();
  } catch (error) {
    console.error("Erreur direct CSV :", error);
    afficherDefaut();
  }
}
function afficherDefaut() {
  const prog = document.querySelector(".live-program");
  const barre = document.querySelector(".progress-fill");
  if (prog) prog.textContent = "Programmes non trouvés";
  if (barre) barre.style.width = "0%";
}
// Fonction pour afficher la description quand on clique sur une affiche
// Fonction pour afficher la description sur N'IMPORTE QUELLE chaîne
// Fonction pour afficher la description 100% blindée
function showDescription(titre, texte) {
  // 1. On cherche la chaîne ouverte (qu'elle s'appelle channel-card ou channel-detail)
  const chaineActive = document.querySelector(
    ".channel-card.active, .channel-detail.active",
  );

  // Sécurité : si on ne la trouve pas, on arrête tout pour ne pas faire planter le site
  if (!chaineActive) {
    console.error("Bug : Impossible de trouver la chaîne active.");
    return;
  }

  // 2. On trouve la boîte de description à l'intérieur de cette chaîne
  const viewer = chaineActive.querySelector(".description-viewer");

  // Sécurité : si tu as oublié de coller la boîte dans le HTML de cette chaîne
  if (!viewer) {
    console.error(
      "Bug : La boîte de description n'existe pas dans cette chaîne !",
    );
    return;
  }

  const titleElem = viewer.querySelector("h4");
  const textElem = viewer.querySelector("p");

  // 3. On remplit les textes
  titleElem.textContent = titre;
  textElem.textContent = texte;

  // 4. On affiche le bloc
  viewer.style.display = "block";

  // 5. On scrolle légèrement pour le voir (pratique sur mobile)
  viewer.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
