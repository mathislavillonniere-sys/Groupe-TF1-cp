let slideIndex = 0;
let isPlaying = true;
let autoPlayInterval; // On déclare la variable qui va stocker le minuteur

const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");

// Fonction pour changer l'affichage
function showSlides(n) {
  slideIndex = (n + slides.length) % slides.length;

  // Cacher toutes les images et éteindre les points
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  // Afficher la bonne image et allumer le bon point
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

// Clic sur les flèches
function changeSlide(n) {
  showSlides(slideIndex + n);
  resetAutoPlay(); // On relance le minuteur pour laisser le temps de lire
}

// Clic sur les points
function currentSlide(n) {
  showSlides(n);
  resetAutoPlay();
}

// Fonction pour DÉMARRER le défilement automatique
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    // Change de slide seulement si on n'est pas en pause
    if (isPlaying) {
      showSlides(slideIndex + 1);
    }
  }, 5000);
}

// Fonction pour RELANCER le défilement après un clic manuel
function resetAutoPlay() {
  if (isPlaying) {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }
}

// Fonction du BOUTON PAUSE / LECTURE
function togglePlay() {
  const playPauseBtn = document.getElementById("play-pause-btn");

  if (isPlaying) {
    // On ARRÊTE
    clearInterval(autoPlayInterval);
    playPauseBtn.innerHTML = "▶ Lecture";
    isPlaying = false;
  } else {
    // On RELANCE
    startAutoPlay();
    playPauseBtn.innerHTML = "⏸ Pause";
    isPlaying = true;
  }
}

// Lancement automatique au premier chargement de la page
startAutoPlay();
