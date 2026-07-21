document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("calendrier-track");
  const prevBtn = document.querySelector(".prev-btn-cal");
  const nextBtn = document.querySelector(".next-btn-cal");

  if (!track || !prevBtn || !nextBtn) return;

  const scrollAmount = 345;

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});
