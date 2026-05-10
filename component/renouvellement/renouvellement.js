// component/renouvellement/renouvellement.js

// 1. VOTRE BASE DE DONNÉES COMPLÈTE MISE À JOUR
const baseProgrammes = [
  // --- RENOUVELLEMENTS ---
  {
    titre: "The Christmas",
    saison: "Saison 5",
    date: "14 janvier 2026",
    statut: "renouvele",
  },
  {
    titre: "NCIS",
    saison: "Saison 24",
    date: "22 janvier 2026",
    statut: "renouvele",
  },
  {
    titre: "NCIS: Hawaii",
    saison: "Saison 6",
    date: "22 janvier 2026",
    statut: "renouvele",
  },
  {
    titre: "CSI: 22 mars 2016",
    saison: "Saison 17",
    date: "22 janvier 2026",
    statut: "renouvele",
  },
  {
    titre: "CSI: Vegas",
    saison: "Saison 6",
    date: "22 janvier 2026",
    statut: "renouvele",
  },
  {
    titre: "Shérif Country",
    saison: "Saison 2",
    date: "22 janvier 2026",
    statut: "renouvele",
  },
  {
    titre: "Ginny et Georgia",
    saison: "Saison 2",
    date: "22 janvier 2026",
    statut: "renouvele",
  },
  {
    titre: "Elsbeth",
    saison: "Saison 2",
    date: "22 janvier 2026",
    statut: "renouvele",
  },

  {
    titre: "Will Trent",
    saison: "Saison 3",
    date: "4 mars 2026",
    statut: "renouvele",
  },
  {
    titre: "NCIS: Los Angeles",
    saison: "Saison 18",
    date: "4 mars 2026",
    statut: "renouvele",
  },
  {
    titre: "NCIS: Nouvelle Orléans",
    saison: "Saison 13",
    date: "4 mars 2026",
    statut: "renouvele",
  },
  {
    titre: "L'épreuve du pouvoir",
    saison: "Saison 2",
    date: "4 mars 2026",
    statut: "renouvele",
  },
  {
    titre: "911",
    saison: "Saison 9",
    date: "4 mars 2026",
    statut: "renouvele",
  },
  {
    titre: "Fire Country",
    saison: "Saison 5",
    date: "4 mars 2026",
    statut: "renouvele",
  },
  {
    titre: "Alerte Attentat : Le monde Attaqué",
    saison: "Saison 7",
    date: "4 mars 2026",
    statut: "renouvele",
  },
  {
    titre: "S.W.A.T.",
    saison: "Saison 10",
    date: "4 mars 2026",
    statut: "renouvele",
  },
  {
    titre: "Tracker",
    saison: "Saison 4",
    date: "4 mars 2026",
    statut: "renouvele",
  },

  {
    titre: "My cats",
    saison: "Saison 11",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "My cats: Feds",
    saison: "Saison 5",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "Demain nous appartient 19",
    saison: "Saison 10",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "CSI: Alerte Attentat",
    saison: "Saison 6",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "CSI: Camping Paradis",
    saison: "Saison 6",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "Hawaii 5-0",
    saison: "Saison 18",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "Magnum",
    saison: "Saison 9",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "MacGyver",
    saison: "Saison 10",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "Alerte : unité des personnes disparues",
    saison: "Saison 5",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "Alice Nevers",
    saison: "Saison 27",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "A Contre sens",
    saison: "Saison 2",
    date: "16 avril 2026",
    statut: "renouvele",
  },
  {
    titre: "Cat's Eyes",
    saison: "Saison 2",
    date: "16 avril 2026",
    statut: "renouvele",
  },

  {
    titre: "Le Late Show",
    saison: "Saison 5",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Les acteurs de DNA",
    saison: "Saison 10",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "DNA Family",
    saison: "Saison 10",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "DNA Info",
    saison: "Saison 10",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Un œil sur le monde",
    saison: "Saison 3",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Alo Quoi.com",
    saison: "Saison 19",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Les Thundermans",
    saison: "Saison 9",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "The camping paradis game",
    saison: "Saison 16",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Total écran: nouvelle génération",
    saison: "Saison 7",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Camping comedy show",
    saison: "Saison 5",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Friends",
    saison: "Saison 17",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "La villa de TF1 Camping Paradis",
    saison: "Saison 5",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Les Gens d'à Coté",
    saison: "Saison 2",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "La vie dans le monde",
    saison: "Saison 6",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Bonjour!",
    saison: "Saison 4",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Les Marseillais",
    saison: "Saison 20 et 21",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "10 couples parfaits",
    saison: "Saison 10",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "La villa des coeurs brisés",
    saison: "Saison 12",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Mon chat, Ma vie",
    saison: "Saison 8",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "13 novembre 2015",
    saison: "Saison 12",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "La déjanté: nouvelle génération",
    saison: "Saison 9",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "La vie est injuste",
    saison: "Saison 19",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "La vie est belle",
    saison: "Saison 19",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "La vie nouvelle génération",
    saison: "Saison 5",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Les plus belles villes de France",
    saison: "Saison 5",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Reportage Découverte",
    saison: "Saison 19",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Petit secret entre voisin",
    saison: "Saison 14",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Le Big Bêtisier",
    saison: "Saison 14",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Top Camping Paradis",
    saison: "Saison 19 et 20",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Top France",
    saison: "Saison 14",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Top streaming",
    saison: "Saison 12",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Top détente",
    saison: "Saison 5",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Le TV168",
    saison: "Saison 10",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Frenchie Shore",
    saison: "Saison 2",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Le Night Club",
    saison: "Saison 2",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "The Unicorn",
    saison: "Saison 5",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Un air de famille",
    saison: "Saison 2",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Le Bêtisier de la semaine",
    saison: "Saison 6",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Samedi l'actu",
    saison: "Saison 3",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Samedi music",
    saison: "Saison 3",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Samedi conso",
    saison: "Saison 3",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Samedi Politique",
    saison: "Saison 3",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Ici tout commence 19",
    saison: "Saison 7",
    date: "10 mai 2026",
    statut: "renouvele",
  },
  {
    titre: "Les secrets du monde",
    saison: "Saison 2",
    date: "10 mai 2026",
    statut: "renouvele",
  },

  // --- ANNULATIONS / FIN ---
  {
    titre: "Manifest",
    saison: "Saison 10 (Dernière)",
    date: "13 avril 2025",
    statut: "annule",
  },
  {
    titre: "Heartstopper",
    saison: "Saison 4 (Dernière)",
    date: "10 mars 2026",
    statut: "annule",
  },
  {
    titre: "NCIS: International",
    saison: "Annulée (Après 6 saisons)",
    date: "16 avril 2026",
    statut: "annule",
  },
  {
    titre: "Grand Reportage",
    saison: "Annulée (Après 1 saison)",
    date: "10 mai 2026",
    statut: "annule",
  },

  // --- NOUVEAUTÉS ---
  {
    titre: "L'épreuve des Nations",
    saison: "Nouveauté (Spin-off)",
    date: "22 janvier 2026",
    statut: "nouveau",
  },
  {
    titre: "The Rookie",
    saison: "Nouveauté",
    date: "15 mars 2026",
    statut: "nouveau",
  },
  {
    titre: "NCIS: New York",
    saison: "Nouveauté (Spin-off)",
    date: "15 avril 2026",
    statut: "nouveau",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const gridRenouveles = document.getElementById("grid-renouveles");
  const gridAnnules = document.getElementById("grid-annules");
  const gridNouveaux = document.getElementById("grid-nouveaux");

  // Construction des cartes
  baseProgrammes.forEach((prog) => {
    let classCard = "";
    let classSeason = "";
    if (prog.statut === "renouvele") {
      classCard = "card-renewed";
      classSeason = "season-renewed";
    } else if (prog.statut === "annule") {
      classCard = "card-canceled";
      classSeason = "season-canceled";
    } else if (prog.statut === "nouveau") {
      classCard = "card-new";
      classSeason = "season-new";
    }

    const cardHTML = `
      <div class="program-card ${classCard}" data-statut="${prog.statut}" data-titre="${prog.titre.toLowerCase()}">
        <div class="show-title">${prog.titre}</div>
        <div class="show-season ${classSeason}">${prog.saison}</div>
        <div class="show-date"><i class="fa-regular fa-calendar"></i> ${prog.date}</div>
      </div>
    `;

    if (prog.statut === "renouvele" && gridRenouveles)
      gridRenouveles.innerHTML += cardHTML;
    if (prog.statut === "annule" && gridAnnules)
      gridAnnules.innerHTML += cardHTML;
    if (prog.statut === "nouveau" && gridNouveaux)
      gridNouveaux.innerHTML += cardHTML;
  });

  // LOGIQUE RECHERCHE + FILTRES
  const searchInput = document.getElementById("search-input");
  const filterBtns = document.querySelectorAll(".filter-btn");
  let activeFilter = "all";

  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const allCards = document.querySelectorAll(".program-card");

    allCards.forEach((card) => {
      const titre = card.dataset.titre;
      const statut = card.dataset.statut;
      const matchSearch = titre.includes(query);
      const matchFilter = activeFilter === "all" || statut === activeFilter;
      card.classList.toggle("hidden", !(matchSearch && matchFilter));
    });

    // Cache les sections vides
    document.querySelectorAll(".program-section").forEach((section) => {
      const grid = section.querySelector(".program-grid");
      const visibles = grid
        ? grid.querySelectorAll(".program-card:not(.hidden)")
        : [];
      section.classList.toggle("section-hidden", visibles.length === 0);
    });
  }

  searchInput.addEventListener("input", applyFilters);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });
});
