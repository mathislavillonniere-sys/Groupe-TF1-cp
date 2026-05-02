let slideIndex = 0;
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");

function showSlides(n) {
  slideIndex = (n + slides.length) % slides.length;

  // Cacher toutes les images et éteindre les points
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  // Afficher la bonne image et allumer le bon point
  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

function changeSlide(n) {
  showSlides(slideIndex + n);
}

function currentSlide(n) {
  showSlides(n);
}

// Auto-play
setInterval(() => {
  changeSlide(1);
}, 6000);
