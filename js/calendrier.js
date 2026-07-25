document.addEventListener("DOMContentLoaded", () => {
  const months = Array.from(document.querySelectorAll(".month-group"));
  const label = document.getElementById("calendrier-month-label");
  const prevBtn = document.querySelector(".prev-btn-cal");
  const nextBtn = document.querySelector(".next-btn-cal");

  if (!months.length || !label || !prevBtn || !nextBtn) return;

  let currentIndex = months.findIndex((m) => m.classList.contains("active"));
  if (currentIndex === -1) currentIndex = 0;

  function renderMonth(index) {
    months.forEach((m, i) => {
      m.classList.toggle("active", i === index);
    });
    label.textContent = months[index].dataset.monthLabel || "";

    // Désactive visuellement les flèches en début/fin de liste
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === months.length - 1;
    prevBtn.style.opacity = prevBtn.disabled ? 0.35 : 1;
    nextBtn.style.opacity = nextBtn.disabled ? 0.35 : 1;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderMonth(currentIndex);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < months.length - 1) {
      currentIndex++;
      renderMonth(currentIndex);
    }
  });

  renderMonth(currentIndex);
});
