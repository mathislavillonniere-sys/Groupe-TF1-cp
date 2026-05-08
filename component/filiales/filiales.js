// component/filiales/filiales.js

const poles = [
  {
    id: "medias",
    titre: "Pôle Médias",
    couleur: "#00152b",
    couleurPastel: "rgba(0, 21, 43, 0.08)",
    categorie: "media",
    logo: "../../photo/pole_media-removebg-preview.png",
    date: "Pôle historique du groupe",
    directeur: {
      nom: "Mathis Lavillonnière",
      role: "Directeur Général du Pôle & PDG du Groupe",
      init: "ML",
    },
    kpiMain: { valeur: "22,5%", label: "Part d'audience" },
    desc: "Le pôle médias est l’activité historique du groupe et regroupe l’ensemble des activités audiovisuelles et de production.",
    metrics: [
      { val: "41M", lab: "streamers/mois" },
      { val: "4", lab: "chaînes & services" },
      { val: "+22%", lab: "croissance digitale" },
      { val: "n°1", lab: "audience France" },
    ],
    filiales: [
      "Chaînes de télévision (généralistes et thématiques)",
      "Production de programmes et de séries",
      "Plateformes numériques et replay",
      "Activités de presse avec CP Press",
    ],
    tags: ["Audiovisuel", "Création", "Numérique", "Presse"],
    icon: "fa-tv",
  },
  {
    id: "telecom",
    titre: "Pôle Télécom",
    couleur: "#E31E24",
    couleurPastel: "rgba(227, 30, 36, 0.08)",
    categorie: "tech",
    logo: "../../photo/pole_telecom-removebg-preview.png",
    date: "Privatisé en 2020",
    directeur: {
      nom: "Damien Menard",
      role: "Directeur Général du Pôle Télécom",
      init: "DM",
    },
    kpiMain: { valeur: "5G", label: "Réseau propre" },
    desc: "L’entreprise a été privatisée en 2020 et appartient désormais à un autre groupe, mais reste un acteur important de l’écosystème économique de la région.",
    metrics: [
      { val: "2", lab: "filiales actives" },
      { val: "100%", lab: "Couverture nationale" },
    ],
    filiales: [
      "Camping Paradis Télécom",
      "Réseaux de télécommunications",
      "Internet fixe et mobile",
      "Services numériques",
    ],
    tags: ["Télécom", "Internet", "Privatisé"],
    icon: "fa-tower-broadcast",
  },
  {
    id: "finance",
    titre: "Pôle Finance",
    couleur: "#185FA5",
    couleurPastel: "rgba(24, 95, 165, 0.08)",
    categorie: "finance",
    logo: "../../photo/pole_finance-removebg-preview.png",
    date: "Institution régionale majeure",
    directeur: {
      nom: "Hervé Bourges",
      role: "Directeur Général du Pôle Finance",
      init: "HB",
    },
    kpiMain: { valeur: "2", label: "Filiales financières" },
    desc: "Centré autour du Crédit Camping Paradis, cette banque est l’une des institutions financières majeures de la région.",
    metrics: [{ val: "2", lab: "filiales actives" }],
    filiales: [
      "Banque de détail",
      "Financement de projets économiques",
      "Services bancaires (particuliers & pros)",
    ],
    tags: ["Banque", "Investissement", "Crédit"],
    icon: "fa-chart-line",
  },
  {
    id: "commerce",
    titre: "Pôle Commerce",
    couleur: "#D85A30",
    couleurPastel: "rgba(216, 90, 48, 0.08)",
    categorie: "commerce",
    logo: "../../photo/pole_commercant-removebg-preview.png",
    date: "Réseau de 150 commerces",
    directeur: {
      nom: "Aline Girard",
      role: "Directrice Générale Pôle Commerçant",
      init: "AG",
    },
    kpiMain: { valeur: "3", label: "Filiales actives" },
    desc: "Le groupe dispose d'un réseau commercial important assurant le développement du commerce régional.",
    metrics: [{ val: "3", lab: "filiales actives" }],
    filiales: [
      "Groupe Association des Commerçants",
      "Gestion d’un réseau d’environ 150 commerces",
      "Plateforme e-commerce Paradis Market",
    ],
    tags: ["Retail", "E-commerce", "Région"],
    icon: "fa-store",
  },
  {
    id: "infra",
    titre: "Pôle Immobilier, Infrastructures & Mobilités",
    couleur: "#854F0B",
    couleurPastel: "rgba(133, 79, 11, 0.08)",
    categorie: "infrastructure",
    logo: "../../photo/pole_immo_trans_infrastructure-removebg-preview.png",
    date: "Développement public et urbain",
    directeur: {
      nom: "Justine Segrestan",
      role: "Directrice Générale Infrastructures",
      init: "JS",
    },
    kpiMain: { valeur: "3", label: "Filiales actives" },
    desc: "Organisé autour de Camping Paradis Infrastructures & Mobilités (CPIM). Cette entreprise exploite notamment le réseau de métro de la métropole de La Garette.",
    metrics: [
      { val: "3", lab: "filiales actives" },
      { val: "Intl", lab: "Présence internationale" },
    ],
    filiales: [
      "RACP (Régie Autonome des Transports)",
      "Développement d’infrastructures publiques",
      "Transport urbain et mobilité",
      "Aménagement territorial",
    ],
    tags: ["Public", "Transport", "RACP", "La Garette"],
    icon: "fa-train-subway",
  },
  {
    id: "inter",
    titre: "Pôle International",
    couleur: "#533AB7",
    couleurPastel: "rgba(83, 58, 183, 0.08)",
    categorie: "commerce",
    logo: "../../photo/pole_internationnal-removebg-preview.png",
    date: "Créé en 2022 · Rayonnement mondial",
    directeur: {
      nom: "Sophie Lachaud",
      role: "Directrice Générale Pôle International",
      init: "SL",
    },
    kpiMain: { valeur: "40+", label: "Pays couverts" },
    desc: "Le pôle international a pour mission de faire rayonner l'expertise et la marque TF1 Camping Paradis à travers le monde via la distribution de formats et la gestion de filiales étrangères.",
    metrics: [
      { val: "40+", lab: "pays d'exportation" },
      { val: "2", lab: "filiales" },
    ],
    filiales: [
      "TF1 CP International (Filiales étrangères)",
      "Distribution (Vente de droits et formats)",
    ],
    tags: ["Export", "Droits", "Distribution"],
    icon: "fa-globe",
  },
  {
    id: "logistique",
    titre: "Pôle Logistique et E-Commerce",
    couleur: "#0F6E56",
    couleurPastel: "rgba(15, 110, 86, 0.08)",
    categorie: "infrastructure",
    logo: "../../photo/pole_logistique_et_ecomerce-removebg-preview.png",
    date: "Gestion des flux de marchandises",
    directeur: {
      nom: "Marc Lavillonnière",
      role: "Président Directeur Général (Frère du Fondateur)",
      init: "ML",
    },
    kpiMain: { valeur: "80%", label: "Taux de service" },
    desc: "Le pôle logistique assure la gestion des flux de marchandises et des opérations du groupe à l'échelle nationale.",
    metrics: [
      { val: "2", lab: "filiales" },
      { val: "Public", lab: "Mission de service public" },
    ],
    filiales: [
      "TF1 Camping Paradis Logistique",
      "Transport et distribution",
      "Gestion des entrepôts",
      "Logistique commerce et infrastructures",
    ],
    tags: ["Logistique", "Supply Chain", "Transport"],
    icon: "fa-truck-fast",
  },
];

function genererPoles() {
  const container = document.getElementById("grille-filiales");
  if (!container) return;

  container.innerHTML = "";

  poles.forEach((pole) => {
    const card = document.createElement("div");
    card.className = "tl-item";
    card.setAttribute("data-categorie", pole.categorie);

    card.innerHTML = `
        <div class="tl-node" style="border-color: ${pole.couleur}; color: ${pole.couleur};">
            <i class="fa-solid ${pole.icon}"></i>
        </div>
        <div class="tl-card">
            
            <div class="tl-header">
                <div class="tl-logo-box" style="background-color: ${pole.couleurPastel}; border: 1px solid ${pole.couleur}33;">
                    <img src="${pole.logo}" alt="" onerror="this.style.display='none'">
                </div>
                <div class="tl-title-wrap">
                    <div class="tl-title">${pole.titre}</div>
                    <div class="tl-date">${pole.date}</div>
                </div>
                <div class="tl-kpi-main">
                    <div class="kpi-main-val" style="color: ${pole.couleur}">${pole.kpiMain.valeur}</div>
                    <div class="kpi-main-lab">${pole.kpiMain.label}</div>
                </div>
            </div>

            <div class="tl-director">
                <div class="tl-avatar" style="background-color: ${pole.couleurPastel}; color: ${pole.couleur};">
                    ${pole.directeur.init}
                </div>
                <div>
                    <span class="dir-name">${pole.directeur.nom}</span>
                    <span class="dir-role">&nbsp;—&nbsp;${pole.directeur.role}</span>
                </div>
            </div>

            <div class="tl-desc">${pole.desc}</div>

            <div class="tl-metrics">
                ${pole.metrics
                  .map(
                    (m) => `
                    <div class="metric-box">
                        <span class="m-val" style="color: ${pole.couleur}">${m.val}</span>
                        <span class="m-lab">${m.lab}</span>
                    </div>
                `,
                  )
                  .join("")}
            </div>

            <div class="tl-filiales">
                <div class="filiales-titre">Activités et Filiales du pôle</div>
                <div class="filiales-grid">
                    ${pole.filiales
                      .map(
                        (f) => `
                        <div class="filiale-chip">
                            <i class="fa-solid fa-circle-dot" style="color: ${pole.couleur}"></i>
                            <span>${f}</span>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
            </div>

            <div class="tl-footer">
                <div class="tl-tags">
                    ${pole.tags.map((t) => `<span class="tl-tag" style="background-color: ${pole.couleurPastel}; color: ${pole.couleur};">${t}</span>`).join("")}
                </div>
                <a href="detail.html?id=${pole.id}" class="tl-btn" style="background-color: ${pole.couleur};">
                    Fiche complète &rarr;
                </a>
            </div>
        </div>
    `;

    container.appendChild(card);
  });
}

function initFilters() {
  const pills = document.querySelectorAll(".filter-pill");
  const items = document.querySelectorAll(".tl-item");

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      const category = pill.getAttribute("data-filter");

      items.forEach((item) => {
        if (
          category === "all" ||
          item.getAttribute("data-categorie") === category
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  genererPoles();
  initFilters();
});
