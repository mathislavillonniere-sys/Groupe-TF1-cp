// component/renouvellement/renouvellement.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 1. Initialisation de Firebase avec tes clés
const firebaseConfig = {
  apiKey: "AIzaSyDT-pc5WPQEsQPLQUCSTCfdb8Kqw4k8EDU",
  authDomain: "groupe-tf1-cp.firebaseapp.com",
  projectId: "groupe-tf1-cp",
  storageBucket: "groupe-tf1-cp.firebasestorage.app",
  messagingSenderId: "345963750865",
  appId: "1:345963750865:web:c2851dc606b6ceb5ebecf0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
  const gridRenouveles = document.getElementById("grid-renouveles");
  const gridAnnules = document.getElementById("grid-annules");
  const gridNouveaux = document.getElementById("grid-nouveaux");

  // ==========================================
  // LOGIQUE DE RECHERCHE ET DE FILTRES
  // ==========================================
  const searchInput = document.getElementById("search-input");
  const filterBtns = document.querySelectorAll(".filter-btn");
  let activeFilter = "all";

  function applyFilters() {
    if (!searchInput) return;
    const queryStr = searchInput.value.toLowerCase().trim();
    const allCards = document.querySelectorAll(".program-card");

    allCards.forEach((card) => {
      const titre = card.dataset.titre;
      const statut = card.dataset.statut;
      const matchSearch = titre.includes(queryStr);
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

  if (searchInput) searchInput.addEventListener("input", applyFilters);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  // ==========================================
  // LECTURE DE LA BASE DE DONNÉES EN TEMPS RÉEL
  // ==========================================
  // On récupère les séries triées par date d'ajout
  const q = query(
    collection(db, "renouvellements"),
    orderBy("ajouteLe", "asc"),
  );

  onSnapshot(q, (snapshot) => {
    // On vide les grilles avant de les remplir (évite les doublons)
    if (gridRenouveles) gridRenouveles.innerHTML = "";
    if (gridAnnules) gridAnnules.innerHTML = "";
    if (gridNouveaux) gridNouveaux.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const prog = docSnap.data();
      let classCard = "";
      let classSeason = "";

      // Application des couleurs selon le statut
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
          <div class="program-card ${classCard}" data-statut="${prog.statut}" data-titre="${(prog.titre || "").toLowerCase()}">
            <div class="show-title">${prog.titre}</div>
            <div class="show-season ${classSeason}">${prog.saison}</div>
            <div class="show-date"><i class="fa-regular fa-calendar"></i> ${prog.date}</div>
          </div>
        `;

      // Répartition dans les bonnes grilles
      if (prog.statut === "renouvele" && gridRenouveles)
        gridRenouveles.innerHTML += cardHTML;
      if (prog.statut === "annule" && gridAnnules)
        gridAnnules.innerHTML += cardHTML;
      if (prog.statut === "nouveau" && gridNouveaux)
        gridNouveaux.innerHTML += cardHTML;
    });

    // Une fois que tout est affiché, on réapplique les filtres (si l'utilisateur avait déjà tapé une recherche)
    applyFilters();
  });
});
