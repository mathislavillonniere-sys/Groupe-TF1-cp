const baseDeDonnees = {
  tf1: {
    nom: "TF1 Camping Paradis",
    type: "hebdo", // Mode par semaine
    data: {
      "2026-04-24": {
        label: "Programme d'automne 2026-2027",
        fichier: "../../csv/tf1_annuel2026-2027automne.csv",
      },
      "2026-04-30": {
        label: "Programme été 2026",
        fichier: "../../csv/tf1_été2026.csv",
      },
      "2026-04-25": {
        label: "Programme Mi-été 2026",
        fichier: "../../csv/tf1_miété2026.csv",
      },
      "2026-04-26": {
        label: "Programme de mi-saison 2025-2026",
        fichier: "../../csv/tf1_annuel2025-2026misaison.csv",
      },
    },
  },
  m6: {
    nom: "M6 Camping Paradis",
    type: "annuel", // Mode par année
    data: {
      2026: {
        label: "Grille été 2026",
        fichier: "../../csv/m6_ete2026.csv",
      },
    },
  },
  tfx: {
    nom: "TFX Camping Paradis",
    type: "Grille Annuelle 2025 - 2026",
    data: {
      2026: {
        label: "Grille été 2026",
        fichier: "../../csv/tfx_ete2026.csv",
      },
    },
  },
  tmc: {
    nom: "TMC Camping Paradis",
    type: "Grille Annuelle 2025 - 2026",
    data: {
      2026: {
        label: "Grille été 2026",
        fichier: "../../csv/tmc_ete2026.csv",
      },
    },
  },
};

// Variables globales pour retenir où l'utilisateur se trouve
let chaineActuelle = "tf1";
let periodesDisponibles = Object.keys(baseDeDonnees[chaineActuelle].data);
let indexActuel = 0;

// --- 2. GESTION DU MENU DÉROULANT SUR-MESURE ---
document.addEventListener("DOMContentLoaded", function () {
  const selectedBtn = document.querySelector(".select-selected");
  const itemsList = document.querySelector(".select-items");
  const options = document.querySelectorAll(".select-items div");

  if (selectedBtn && itemsList) {
    // Ouvrir/Fermer le menu
    selectedBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      itemsList.classList.toggle("select-hide");
    });

    // Fermer si on clique ailleurs
    document.addEventListener("click", function () {
      itemsList.classList.add("select-hide");
    });

    // Quand on choisit une nouvelle chaîne
    options.forEach((option) => {
      option.addEventListener("click", function () {
        selectedBtn.innerHTML = this.innerHTML;
        chaineActuelle = this.getAttribute("data-value");

        // On réinitialise les données pour la nouvelle chaîne
        periodesDisponibles = Object.keys(baseDeDonnees[chaineActuelle].data);
        indexActuel = 0;
        chargerGrille();
      });
    });
  }

  // Lancement initial
  chargerGrille();
});

// --- 3. LOGIQUE D'AFFICHAGE ET CHARGEMENT DU CSV ---
function chargerGrille() {
  const dataChaine = baseDeDonnees[chaineActuelle];
  const idPeriode = periodesDisponibles[indexActuel];

  // A. Mise à jour du grand titre
  document.querySelector(".page-title").textContent =
    "Grilles TV - " + dataChaine.nom;

  // B. Adaptation du sélecteur (Semaine vs Année)
  const labelElement = document.querySelector(".semaine-info .label");
  const datesElement = document.getElementById("affichage-semaine");
  const weekSelectorContainer = document.querySelector(
    ".semaine-selector-container",
  );

  if (labelElement) {
    labelElement.textContent =
      dataChaine.type === "hebdo"
        ? "SÉLECTIONNER UNE SEMAINE"
        : "SÉLECTIONNER UNE ANNÉE";
  }
  if (datesElement && idPeriode && dataChaine.data[idPeriode]) {
    datesElement.textContent = dataChaine.data[idPeriode].label;
  }

  // Griser les boutons s'il n'y a qu'un seul choix (ex: juste 2026 dispo)
  if (weekSelectorContainer) {
    if (periodesDisponibles.length <= 1) {
      weekSelectorContainer.style.opacity = "0.5";
      weekSelectorContainer.style.pointerEvents = "none";
    } else {
      weekSelectorContainer.style.opacity = "1";
      weekSelectorContainer.style.pointerEvents = "auto";
    }
  }

  // C. Masquer/Afficher les blocs selon la chaîne (Prime Time uniquement pour TFX/TMC/M6)
  const sections = document.querySelectorAll(".categorie-section");
  const estChaineReduite = ["tfx", "tmc", "m6", "tf1"].includes(chaineActuelle);

  sections.forEach((section) => {
    const titre = section
      .querySelector(".titre-categorie")
      .textContent.toLowerCase();
    if (
      estChaineReduite &&
      !titre.includes("prime time") &&
      !titre.includes("soirée")
    ) {
      section.style.display = "none";
    } else {
      section.style.display = "block";
    }
  });

  // D. Récupération des données du fichier CSV
  if (idPeriode && dataChaine.data[idPeriode]) {
    const dataPeriode = dataChaine.data[idPeriode];

    // Messages de chargement
    document.getElementById("grille-soir").innerHTML =
      "<p style='padding:20px'>Chargement en cours...</p>";
    if (document.getElementById("grille-nuit"))
      document.getElementById("grille-nuit").innerHTML = "";
    document.getElementById("grille-matin").innerHTML = "";
    document.getElementById("grille-apres-midi").innerHTML = "";

    fetch(dataPeriode.fichier)
      .then((response) => {
        if (!response.ok) throw new Error("Fichier introuvable");
        return response.arrayBuffer();
      })
      .then((buffer) => {
        // Décodage pour garder les accents français (é, à, etc.)
        const decoder = new TextDecoder("iso-8859-1");
        const csvBrut = decoder.decode(buffer);
        genererGrillesParTrancheHoraire(csvBrut);
      })
      .catch((erreur) => {
        document.getElementById("grille-soir").innerHTML =
          "<p style='padding:20px; color:red;'>Erreur : Grille non disponible pour cette période.</p>";
      });
  }
}

// --- 4. NAVIGATION (BOUTONS PRÉCÉDENT / SUIVANT) ---
// Cette fonction gère aussi bien le passage de semaines que d'années
function changerSemaine(direction) {
  indexActuel += direction;
  // Sécurités pour ne pas déborder de la liste
  if (indexActuel < 0) indexActuel = 0;
  if (indexActuel >= periodesDisponibles.length)
    indexActuel = periodesDisponibles.length - 1;
  chargerGrille();
}

// --- 5. TRI ET CRÉATION DES GRILLES HTML ---
function genererGrillesParTrancheHoraire(csvBrut) {
  const lignes = csvBrut.split("\n");
  if (lignes.length < 2) return;

  const jours = parseCSVLine(lignes[0]);

  // On vide l'écran
  document.getElementById("grille-soir").innerHTML = "";
  if (document.getElementById("grille-nuit"))
    document.getElementById("grille-nuit").innerHTML = "";
  document.getElementById("grille-matin").innerHTML = "";
  document.getElementById("grille-apres-midi").innerHTML = "";

  // On prépare nos 4 tiroirs
  let lignesSoir = [];
  let lignesNuit = [];
  let lignesMatin = [];
  let lignesApresMidi = [];

  // On analyse les lignes (en ignorant les 2 premières lignes d'en-tête d'Excel)
  for (let i = 2; i < lignes.length; i++) {
    if (lignes[i].trim() === "") continue;

    const cellules = parseCSVLine(lignes[i]);
    let trancheHoraire = "matin";

    // Détection de l'heure
    for (let j = 0; j < 7; j++) {
      if (cellules[j * 2] && cellules[j * 2].trim() !== "") {
        let chaineHeure = cellules[j * 2].trim().toUpperCase();
        let heure = parseInt(chaineHeure, 10);
        let minutes = 0;

        let separationIndex = chaineHeure.indexOf("H");
        if (separationIndex !== -1) {
          let chaineMinutes = chaineHeure.substring(separationIndex + 1).trim();
          if (chaineMinutes !== "") minutes = parseInt(chaineMinutes, 10);
        }

        if (!isNaN(heure)) {
          // TRI DU PRIME TIME ET DES AUTRES TRANCHES
          if (
            (heure === 21 && minutes >= "00") ||
            heure === 22 ||
            (heure === 23 && minutes < 26)
          ) {
            trancheHoraire = "soir";
          } else if ((heure === 23 && minutes >= 26) || heure < 6) {
            trancheHoraire = "nuit";
          } else if (heure >= 6 && heure < 13) {
            trancheHoraire = "matin";
          } else {
            trancheHoraire = "apres-midi";
          }
          break;
        }
      }
    }

    // On range dans le bon tiroir
    if (trancheHoraire === "soir") lignesSoir.push(cellules);
    else if (trancheHoraire === "nuit") lignesNuit.push(cellules);
    else if (trancheHoraire === "matin") lignesMatin.push(cellules);
    else lignesApresMidi.push(cellules);
  }

  // Fonction interne pour construire les éléments HTML
  function construireBloc(containerId, dataLignes) {
    const conteneur = document.getElementById(containerId);
    if (!conteneur) return;

    for (let j = 0; j < 7; j++) {
      const colHeure = j * 2;
      const colTitre = j * 2 + 1;

      const jourDiv = document.createElement("div");
      jourDiv.className = "colonne-jour";

      const titreJour = document.createElement("div");
      titreJour.className = "titre-jour";
      titreJour.textContent = jours[colHeure] ? jours[colHeure].trim() : "JOUR";
      jourDiv.appendChild(titreJour);

      for (let row of dataLignes) {
        if (row[colHeure] && row[colTitre] && row[colTitre].trim() !== "") {
          const progDiv = document.createElement("div");
          progDiv.className = "programme-item";
          progDiv.innerHTML = `
                        <div class="heure-prog">${row[colHeure].trim()}</div>
                        <div class="titre-prog">${row[colTitre].trim().replace(/^"|"$/g, "")}</div>
                    `;
          jourDiv.appendChild(progDiv);
        }
      }
      conteneur.appendChild(jourDiv);
    }
  }

  // On lance la construction des 4 grilles
  construireBloc("grille-soir", lignesSoir);
  construireBloc("grille-nuit", lignesNuit);
  construireBloc("grille-matin", lignesMatin);
  construireBloc("grille-apres-midi", lignesApresMidi);
}

// --- 6. OUTIL DE LECTURE DES VIRGULES DU CSV ---
function parseCSVLine(text) {
  let result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    let c = text[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      result.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}
