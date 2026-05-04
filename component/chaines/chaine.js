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
  "2026-04-25": "../../csv/tf1_semaine_25avril.csv",
  "2026-05-02": "../../csv/tf1_semaine_2mai.csv",
  "2026-05-10": "../../csv/tf1_semaine_10mai.csv",
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
    const textCSV = await response.text();
    const lignes = textCSV.split("\n");

    const maintenant = new Date();

    // --- L'ASTUCE DE LA "JOURNÉE TV" ---
    // En télé, la journée commence à 6h. Si on regarde à 2h du matin le Mardi,
    // on doit lire les programmes à la fin de la colonne du Lundi !
    let jourSemaineReel = maintenant.getDay(); // 0=Dimanche, 1=Lundi...
    let dateColonne = new Date(maintenant.getTime());

    if (maintenant.getHours() < 6) {
      jourSemaineReel = jourSemaineReel === 0 ? 6 : jourSemaineReel - 1;
      dateColonne.setDate(dateColonne.getDate() - 1); // La base c'est hier
    }

    // --- TROUVER LES BONNES COLONNES DANS TON TABLEAU ---
    // Ton fichier : Lundi = col 0 & 1, Mardi = col 2 & 3, ... Dimanche = 12 & 13
    let colHeure, colProg;
    if (jourSemaineReel === 0) {
      colHeure = 12;
      colProg = 13; // Dimanche
    } else {
      colHeure = (jourSemaineReel - 1) * 2;
      colProg = colHeure + 1;
    }

    const programmesDeLaJournee = [];
    let dayOffset = 0;
    let previousHours = -1;

    // --- LECTURE LIGNE PAR LIGNE (On commence à la ligne 3 pour sauter l'en-tête) ---
    for (let i = 2; i < lignes.length; i++) {
      if (!lignes[i].trim()) continue;

      // Ton fichier utilise des VIRGULES pour séparer les colonnes
      const colonnes = lignes[i].split(",");

      // Si la colonne de notre jour existe sur cette ligne
      if (colonnes.length > colProg) {
        let heureBrute = colonnes[colHeure] ? colonnes[colHeure].trim() : "";
        let titre = colonnes[colProg] ? colonnes[colProg].trim() : "";

        if (heureBrute && titre) {
          // 1. On nettoie "20 H 35" pour le transformer en "20:35"
          let heurePropre = heureBrute.replace(/h/i, ":").replace(/\s/g, "");
          const parts = heurePropre.split(":");
          const heures = parseInt(parts[0], 10) || 0;
          const minutes = parseInt(parts[1], 10) || 0;

          // 2. Gestion du passage après minuit (ex: on passe de 23h à 00h)
          if (previousHours !== -1 && heures < previousHours) {
            dayOffset = 1; // On rajoute un jour au compteur
          }
          previousHours = heures;

          // 3. On crée la date précise du programme
          const dateDuProgramme = new Date(dateColonne.getTime());
          dateDuProgramme.setHours(heures, minutes, 0, 0);
          dateDuProgramme.setDate(dateDuProgramme.getDate() + dayOffset);

          programmesDeLaJournee.push({
            titre: titre,
            dateDebut: dateDuProgramme,
          });
        }
      }
    }

    // --- RECHERCHE DU PROGRAMME ACTUEL ---
    let programmeTrouve = false;

    for (let j = 0; j < programmesDeLaJournee.length; j++) {
      const progActuel = programmesDeLaJournee[j];
      const debut = progActuel.dateDebut;

      // La fin du programme, c'est le début du suivant !
      let fin;
      if (j + 1 < programmesDeLaJournee.length) {
        fin = programmesDeLaJournee[j + 1].dateDebut;
      } else {
        fin = new Date(debut.getTime() + 2 * 60 * 60 * 1000); // +2h si c'est le dernier
      }

      // EST-CE QU'ON EST EN DIRECT SUR CE PROGRAMME ?
      if (maintenant >= debut && maintenant < fin) {
        const dureeTotale = fin - debut;
        const tempsPasse = maintenant - debut;
        const pourcentage = Math.min((tempsPasse / dureeTotale) * 100, 100);

        document.querySelector(".live-program").textContent = progActuel.titre;
        document.querySelector(".progress-fill").style.width =
          pourcentage + "%";
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
  if (prog) prog.textContent = "Programmes habituels";
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
