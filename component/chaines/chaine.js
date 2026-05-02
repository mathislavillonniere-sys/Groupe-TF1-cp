// Fonction pour ouvrir les onglets au clic
function openChannel(event, channelId) {
  // 1. On récupère toutes les boîtes de détail et on les cache
  const contents = document.querySelectorAll(".channel-detail");
  contents.forEach((content) => {
    content.classList.remove("active");
  });

  // 2. On récupère tous les boutons et on leur retire la couleur bleue
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });

  // 3. On affiche la boîte de la chaîne demandée
  const boxToShow = document.getElementById(channelId);
  if (boxToShow) {
    boxToShow.classList.add("active");
  }

  // 4. On met en surbrillance (bleu) le bouton qui vient d'être cliqué
  if (event && event.currentTarget) {
    event.currentTarget.classList.add("active");
  }
}

// ========================================================
// LE CODE MAGIQUE POUR LIER DEPUIS L'ACCUEIL
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  // On regarde l'URL de la page (ex: chaines.html?chaine=tfx)
  const params = new URLSearchParams(window.location.search);
  const chaineDemandee = params.get("chaine");

  if (chaineDemandee) {
    // On cherche le bouton qui correspond à cette chaîne
    const btnToClick = document.querySelector(
      `.tab-btn[onclick*="${chaineDemandee}"]`,
    );

    if (btnToClick) {
      // On simule un clic dessus !
      btnToClick.click();
    }
  }
});
