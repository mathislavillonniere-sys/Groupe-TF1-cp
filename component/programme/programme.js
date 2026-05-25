// ============================================================
// programmes.js - Navigation des carrousels horizontaux
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Sélectionner toutes les lignes (row-wrapper)
  const rowWrappers = document.querySelectorAll(".row-wrapper");

  rowWrappers.forEach((wrapper) => {
    const container = wrapper.querySelector(".row-container");
    const btnLeft = wrapper.querySelector(".scroll-left");
    const btnRight = wrapper.querySelector(".scroll-right");

    // La distance de défilement (environ la taille de 2.5 cartes)
    const scrollAmount = 800;

    if (btnLeft && btnRight && container) {
      btnLeft.addEventListener("click", () => {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });

      btnRight.addEventListener("click", () => {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });

      // Petite astuce : Cacher la flèche gauche si on est tout au début
      container.addEventListener("scroll", () => {
        if (container.scrollLeft === 0) {
          btnLeft.style.opacity = "0";
          btnLeft.style.pointerEvents = "none";
        } else {
          // On remet l'opacité à "vide" pour laisser le hover CSS faire son travail
          btnLeft.style.opacity = "";
          btnLeft.style.pointerEvents = "auto";
        }
      });

      // Déclencher le check au chargement
      container.dispatchEvent(new Event("scroll"));
    }
  });
});
