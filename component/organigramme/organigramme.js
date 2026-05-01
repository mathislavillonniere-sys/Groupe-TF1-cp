// component/organigramme/organigramme.js

const orgData = {
  nomPDG: "Mathis Lavillonnière",
  poles: [
    {
      nom: "Pôle Média",
      directeur: "Mathis Lavillonnière",
      icone: "fa-solid fa-tv",
      filiales: [
        "TF1 CP, M6 CP, TMC CP",
        "TF1 CP +, CP Info",
        "Studios de Production",
      ],
    },
    {
      nom: "Pôle Télécom",
      directeur: "Damien Menard",
      icone: "fa-solid fa-tower-broadcast",
      filiales: ["CP Télécom (Réseaux)", "Société & Moi (Services)"],
    },
    {
      nom: "Pôle Commerçant",
      directeur: "Aline Girard",
      icone: "fa-solid fa-store",
      filiales: [
        "Licences & Produits",
        "Color School",
        "Union des commerçants",
      ],
    },
    {
      nom: "France Camping Paradis",
      directeur: "Patrice Lamart",
      icone: "fa-solid fa-handshake",
      filiales: ["Mission Service Public", "Production fédératrice"],
    },
    {
      nom: "Pôle Immobilier",
      directeur: "Justine Segrestan",
      icone: "fa-solid fa-building",
      filiales: ["CP Immobilier", "Resorts Camping Paradis"],
    },
    {
      nom: "Pôle Finance",
      directeur: "Hervé Bourges",
      icone: "fa-solid fa-chart-line",
      filiales: ["Crédit Camping Paradis", "Assurances Groupe"],
    },
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Afficher le PDG
  const ceoContainer = document.getElementById("ceo-container");
  ceoContainer.innerHTML = `
        <div class="ceo-card">
            <h2>${orgData.nomPDG}</h2>
            <p>Président-Directeur Général du Groupe</p>
        </div>
    `;

  // 2. Afficher la grille des pôles
  const grid = document.getElementById("poles-grid");
  orgData.poles.forEach((pole) => {
    const poleHTML = `
            <div class="pole-card-pro">
                <div class="pole-header">
                    <i class="${pole.icone}"></i>
                    <h3>${pole.nom}</h3>
                </div>
                <div class="director-name">Dirigé par : ${pole.directeur}</div>
                <ul class="sub-entities">
                    ${pole.filiales.map((f) => `<li>${f}</li>`).join("")}
                </ul>
            </div>
        `;
    grid.innerHTML += poleHTML;
  });
});
