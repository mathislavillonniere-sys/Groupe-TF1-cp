const baseDeDonnees = {
  tf1: {
    nom: "TF1 Camping Paradis",
    type: "hebdo", // Mode par semaine
    data: {
      "2026-06-15": {
        label: "Semaine du 15 au 21 Juin 2026",
        fichier: "../../csv/tf1_semaine_15juin.csv",
      },
      "2026-06-22": {
        label: "Semaine du 22 au 28 Juin 2026",
        fichier: "../../csv/tf1_semaine_22juin.csv",
      },
      "2026-06-29": {
        label: "Semaine du 29 Juin au 5 Juillet 2026",
        fichier: "../../csv/tf1_semaine_29juin.csv",
      },
      "2026-07-06": {
        label: "Semaine du 6 au 12 Juillet 2026",
        fichier: "../../csv/tf1_semaine_6juillet.csv",
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
      2027: {
        label: "Grille Annuelle 2026 - 2027",
        fichier: "../../csv/m6_annuel2026-2027.csv",
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
      2027: {
        label: "Grille Annuelle 2026 - 2027",
        fichier: "../../csv/tfx_annuel2026-2027.csv",
      },
    },
  },
  lci: {
    nom: "LCI Camping Paradis",
    type: "Grille Annuelle 2025 - 2026",
    data: {
      2026: {
        label: "Grille Annuelle 2025 - 2026",
        fichier: "../../csv/lci_annuel2025-2026.csv",
      },
      // 2027: {
      //   label: "Grille Annuelle 2026 - 2027",
      //   fichier: "../../csv/lci_annuel2026-2027.csv",
      // },
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
      2027: {
        label: "Grille Annuelle 2026 - 2027",
        fichier: "../../csv/tmc_annuel2026-2027.csv",
      },
    },
  },
  // Ajoutez TMC et TFX sur le même modèle que M6
  family: {
    nom: "Family Camping Paradis",
    type: "annuel", // ou "hebdo" si tu préfères fonctionner par semaine comme TF1
    data: {
      2027: {
        label: "Grille Annuelle 2026 - 2027",
        fichier: "../../csv/family_annuel2026-2027.csv",
      },
    },
  },
};

// Variables globales pour retenir où l'utilisateur se trouve
let chaineActuelle = "tf1";
let periodesDisponibles = Object.keys(baseDeDonnees[chaineActuelle].data);

// 🧠 NOUVEAU : Fonction magique pour trouver automatiquement la semaine en cours
function calculerIndexSemaineActuelle() {
  const aujourdHui = new Date(); // Récupère la date du jour
  let index = 0;

  for (let i = 0; i < periodesDisponibles.length; i++) {
    // Transforme le texte (ex: "2026-05-11") en vraie Date informatique
    const dateSemaine = new Date(periodesDisponibles[i]);

    // Si on a dépassé ou atteint cette semaine, on la retient
    if (aujourdHui >= dateSemaine) {
      index = i;
    } else {
      break; // Dès qu'on tombe sur une semaine future, on s'arrête !
    }
  }
  return index;
}

// Au lieu de démarrer à 0, on démarre directement sur la bonne semaine !
let indexActuel = calculerIndexSemaineActuelle();

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

        // 🧠 MODIFICATION ICI : On reste sur la bonne date même en changeant de chaîne
        indexActuel = calculerIndexSemaineActuelle();

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
  const estChaineReduite = ["tfx", "tmc", "m6", "family"].includes(
    chaineActuelle,
  );

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
          } else if ((heure === 23 && minutes >= 26) || heure <= 5) {
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

    // Détection du jour actuel
    const today = new Date();
    let jourSemaine = today.getDay();
    let indexJourActuel = jourSemaine === 0 ? 6 : jourSemaine - 1;

    // 🚨 LA CORRECTION EST ICI : On vérifie si la semaine affichée à l'écran est bien la semaine actuelle
    const isCurrentWeek = indexActuel === calculerIndexSemaineActuelle();

    for (let j = 0; j < 7; j++) {
      const colHeure = j * 2;
      const colTitre = j * 2 + 1;

      const jourDiv = document.createElement("div");
      jourDiv.className = "colonne-jour";

      // 🚨 On allume la colonne SEULEMENT si c'est le bon jour ET la bonne semaine !
      if (isCurrentWeek && j === indexJourActuel) {
        jourDiv.classList.add("colonne-aujourdhui");
      }

      const titreJour = document.createElement("div");
      titreJour.className = "titre-jour";
      titreJour.textContent = jours[colHeure] ? jours[colHeure].trim() : "JOUR";
      jourDiv.appendChild(titreJour);

      for (let row of dataLignes) {
        if (row[colHeure] && row[colTitre] && row[colTitre].trim() !== "") {
          const progDiv = document.createElement("div");
          progDiv.className = "programme-item";

          // On sauvegarde l'heure dans la case pour l'aiguille
          progDiv.dataset.heure = row[colHeure].trim();

          progDiv.innerHTML = `
                        <div class="heure-prog">${row[colHeure].trim()}</div>
                        <div class="titre-prog">${row[colTitre].trim().replace(/^"|"$/g, "")}</div>
                        <div class="progress-container"><div class="progress-bar"></div></div>
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
  setTimeout(actualiserDirect, 100); // Lance l'aiguille
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
// --- 7. LE MOTEUR DU DIRECT ET DE L'AIGUILLE ---
function actualiserDirect() {
  const casesAujourdhui = document.querySelectorAll(
    ".colonne-aujourdhui .programme-item",
  );
  if (casesAujourdhui.length === 0) return;

  const maintenant = new Date();
  let minutesActuelles = maintenant.getHours() * 60 + maintenant.getMinutes();
  if (maintenant.getHours() < 6) minutesActuelles += 24 * 60; // Gère la nuit (ex: 2h du mat)

  // Nettoyage avant calcul
  document.querySelectorAll(".programme-item.en-direct").forEach((el) => {
    el.classList.remove("en-direct");
    if (el.querySelector(".progress-bar"))
      el.querySelector(".progress-bar").style.height = "0%";
  });

  // Tri de toutes les émissions de la journée par heure d'apparition
  let emissions = Array.from(casesAujourdhui)
    .map((el) => {
      const timeStr = el.dataset.heure.toUpperCase().split("H");
      let h = parseInt(timeStr[0]) || 0;
      let m = parseInt(timeStr[1]) || 0;
      let totalMinutes = h * 60 + m;
      if (h < 6) totalMinutes += 24 * 60;
      return { element: el, debut: totalMinutes };
    })
    .sort((a, b) => a.debut - b.debut); // Trie chronologiquement

  // Recherche du programme en cours
  for (let i = 0; i < emissions.length; i++) {
    const progActuel = emissions[i];
    // L'émission de fin est la suivante (ou 6h du mat le lendemain s'il n'y a plus rien)
    const progSuivant = emissions[i + 1]
      ? emissions[i + 1].debut
      : 24 * 60 + 6 * 60;

    if (
      minutesActuelles >= progActuel.debut &&
      minutesActuelles < progSuivant
    ) {
      progActuel.element.classList.add("en-direct");

      // Calcul mathématique de l'avancée de l'aiguille
      const dureeTotale = progSuivant - progActuel.debut;
      const dureeEcoulee = minutesActuelles - progActuel.debut;
      let pourcentage = (dureeEcoulee / dureeTotale) * 100;

      const barre = progActuel.element.querySelector(".progress-bar");
      if (barre) barre.style.height = pourcentage + "%";

      break; // Trouvé ! On arrête la recherche.
    }
  }
}

// Actualise l'aiguille toutes les 60 secondes pour qu'elle avance en direct !
setInterval(actualiserDirect, 60000);
