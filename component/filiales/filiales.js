// component/filiales/filiales.js

const poles = [
  {
    id: "medias",
    titre: "Pôle Télévision & Médias",
    image: "../../photo/pole_media-removebg-preview.png", // <--- REMPLACEZ PAR LE NOM DE VOTRE PHOTO
    desc: "Le cœur historique du groupe. Production et diffusion de contenus audiovisuels de premier plan.",
  },
  {
    id: "telecom",
    titre: "Pôle Télécom",
    image: "../../photo/pole_telecom-removebg-preview.png", // <--- REMPLACEZ PAR LE NOM DE VOTRE PHOTO
    desc: "Déploiement des infrastructures numériques et services connectés de nouvelle génération.",
  },
  {
    id: "commerce",
    titre: "Pôle Commerçant",
    image: "../../photo/pole_commercant-removebg-preview.png", // <--- REMPLACEZ PAR LE NOM DE VOTRE PHOTO
    desc: "Exploitation de nos marques, licences officielles, et gestion des partenariats commerciaux.",
  },
  {
    id: "log et e-com",
    titre: "Pôle Logistique et E-Commerce",
    image: "../../photo/pole_logistique_et_ecomerce-removebg-preview.png", // <--- REMPLACEZ PAR LE NOM DE VOTRE PHOTO
    desc: "Pôle de service public en lien avec l'État, assurant la production de contenus fédérateurs.",
  },
  {
    id: "infra",
    titre: "Pôle Immobilier, transport et infrastructure",
    image: "../../photo/pole_immo_trans_infrastructure-removebg-preview.png", // <--- REMPLACEZ PAR LE NOM DE VOTRE PHOTO
    desc: "Gestion de notre patrimoine foncier et développement des infrastructures hôtelières de plein air.",
  },
  {
    id: "finance",
    titre: "Pôle Finance",
    image: "../../photo/pole_finance-removebg-preview.png", // <--- REMPLACEZ PAR LE NOM DE VOTRE PHOTO
    desc: "Pôle de financement solide, regroupant la Banque Camping Paradis et nos services d'assurance.",
  },
  {
    id: "inter",
    titre: "International",
    image: "../../photo/pole_internationnal-removebg-preview.png", // <--- REMPLACEZ PAR LE NOM DE VOTRE PHOTO
    desc: "Ambassadeur du groupe à l'étranger, pilotant l'exportation et la distribution mondiale.",
  },
];

function genererPoles() {
  const container = document.getElementById("grille-filiales");
  if (!container) return;

  container.innerHTML = "";

  poles.forEach((pole) => {
    const card = document.createElement("div");
    card.className = "pole-card";

    // Le HTML a été adapté pour inclure l'image en haut de la carte
    card.innerHTML = `
        <div class="pole-image">
            <img src="${pole.image}" alt="Image du pôle ${pole.titre}">
        </div>
        <div class="pole-content">
            <h3 class="pole-title">${pole.titre}</h3>
            <p class="pole-desc">${pole.desc}</p>
        </div>
        <a href="detail.html?id=${pole.id}" class="btn-voir-plus">
            Consulter la fiche complète
        </a>
    `;

    container.appendChild(card);
  });
}

genererPoles();
