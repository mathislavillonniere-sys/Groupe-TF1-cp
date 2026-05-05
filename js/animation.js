document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
       1. ANIMATION DES COMPTEURS (CHIFFRES CLÉS)
       ========================================================= */
  function animerCompteur(element) {
    const target = parseFloat(element.getAttribute("data-target"));
    const suffix = element.getAttribute("data-suffix") || "";
    const isFloat = target % 1 !== 0; // Vérifie si c'est un nombre à virgule (ex: 3.5)
    const duration = 2000; // Durée de l'animation en millisecondes (2 secondes)
    let startTime = null;

    function updateCompteur(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      // Calcule le pourcentage de l'animation (de 0 à 1)
      const percentage = Math.min(progress / duration, 1);

      // Effet de décélération (ça ralentit à la fin)
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      const currentVal = target * easeOut;

      // Affichage avec ou sans virgule
      if (isFloat) {
        element.textContent = currentVal.toFixed(1) + suffix;
      } else {
        element.textContent = Math.floor(currentVal) + suffix;
      }

      // Continue l'animation si on n'a pas atteint la fin
      if (percentage < 1) {
        requestAnimationFrame(updateCompteur);
      } else {
        element.textContent = target + suffix; // Sécurité pour afficher le chiffre exact à la fin
      }
    }

    requestAnimationFrame(updateCompteur);
  }

  /* =========================================================
       2. DÉTECTION DU SCROLL (INTERSECTION OBSERVER)
       ========================================================= */
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15, // Se déclenche quand 15% de l'élément est visible à l'écran
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 1. On fait apparaître l'élément (titre, carte, etc.)
        entry.target.classList.add("is-visible");

        // 2. Si l'élément contient des compteurs, on les lance
        const compteurs = entry.target.querySelectorAll(".compteur");
        compteurs.forEach((compteur) => {
          // On vérifie qu'on ne l'a pas déjà animé
          if (!compteur.classList.contains("compte-termine")) {
            animerCompteur(compteur);
            compteur.classList.add("compte-termine");
          }
        });

        // On arrête d'observer cet élément pour ne pas rejouer l'animation
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // On cible tous les éléments qui ont la classe "animate-on-scroll"
  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
  /* =========================================================
     3. CARROUSEL ACTUALITÉS (NEWSROOM)
     ========================================================= */
  const newsTrack = document.getElementById("news-track");
  const btnPrevNews = document.querySelector(".prev-btn-news");
  const btnNextNews = document.querySelector(".next-btn-news");

  if (newsTrack && btnPrevNews && btnNextNews) {
    const scrollAmount = 350;

    btnNextNews.addEventListener("click", () => {
      newsTrack.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    btnPrevNews.addEventListener("click", () => {
      newsTrack.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  /* =========================================================
     4. BOUTON REMONTER EN HAUT
     ========================================================= */
  const btnTop = document.getElementById("btn-back-to-top");

  if (btnTop) {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
      ) {
        btnTop.style.display = "block";
      } else {
        btnTop.style.display = "none";
      }
    });

    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
