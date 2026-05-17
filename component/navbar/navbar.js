// component/navbar/navbar.js

document.addEventListener("DOMContentLoaded", function () {
  // On regarde si on est dans un sous-dossier "component"
  const estDansSousDossier = window.location.pathname.includes("/component/");

  // Si on est dans un sous-dossier, on recule (../../), sinon on reste à la racine (./)
  const prefixe = estDansSousDossier ? "../../" : "./";

  const navbarHTML = `
    <nav class="navbar">
      <div class="nav-container">
        <a href="${prefixe}index.html" class="nav-logo">
          <img src="${prefixe}photo/logo_sombre-removebg-preview.png" alt="Logo TF1 CP Groupe" />
        </a>

        <div class="menu-toggle" id="mobile-menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>

        <ul class="nav-menu" id="nav-menu">
          <li class="dropdown">
            <a href="#">Notre Groupe ▾</a>
            <ul class="dropdown-content">
              <li><a href="${prefixe}component/histoire/histoire.html" class="nav-link">Notre Histoire</a></li>
              <li><a href="${prefixe}component/direction/direction.html" class="nav-link">Notre Direction</a></li>
              <li><a href="${prefixe}component/filiales/filiales.html" class="nav-link">Nos Pôles</a></li>
              <li><a href="${prefixe}component/chiffres/chiffre.html" class="nav-link">Chiffres Clés</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#">Nos Chaînes ▾</a>
            <ul class="dropdown-content">
              <li><a href="${prefixe}component/chaines/chaines.html" class="nav-link">Nos Chaînes</a></li>
              <li><a href="${prefixe}component/pro/pro.html" class="nav-link">Grille des Programmes</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#">Nos Programmes ▾</a>
            <ul class="dropdown-content">
              <li><a href="${prefixe}component/renouvellement/renouvellement.html" class="nav-link">Renouvellement 2026-2027</a></li>
              <li><a href="${prefixe}component/Grille de rentrée et d'été/pro.html" class="nav-link">Grille saisonnière</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#">Presse ▾</a>
            <ul class="dropdown-content">
              <li><a href="${prefixe}component/presse/presse.html" class="nav-link">Espace Presse</a></li>
              <li><a href="${prefixe}component/pressekit/pressekit.html" class="nav-link">Presse Kit Média</a></li>
            </ul>
          </li>
          <li class="nav-admin">
            <a href="${prefixe}serveur/admin.html" class="btn-admin">
              <i class="fas fa-user-shield"></i> Espace Admin
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `;

  // On injecte le menu tout en haut de la page
  document.body.insertAdjacentHTML("afterbegin", navbarHTML);

  // ==========================================
  // NOUVEAU : LOGIQUE DU MENU MOBILE
  // ==========================================
  const menuToggle = document.getElementById("mobile-menu");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("is-active"); // Transforme le hamburger en croix
      navMenu.classList.toggle("active"); // Fait glisser le menu
    });
  }
});
// ========================================================
// FIX ULTRA-AGRESSIF POUR IPHONE (STANDALONE)
// ========================================================
if ("standalone" in window.navigator && window.navigator.standalone) {
  document.addEventListener(
    "click",
    function (event) {
      // Cherche si on a cliqué sur un lien ou à l'intérieur d'un lien
      let target = event.target;
      while (target && target.tagName !== "A") {
        target = target.parentNode;
      }

      // Si c'est un lien interne, on bloque Safari et on force le chargement interne
      if (
        target &&
        target.href &&
        target.host === location.host &&
        target.target !== "_blank"
      ) {
        event.preventDefault();
        window.location.href = target.href;
      }
    },
    false,
  );
}
