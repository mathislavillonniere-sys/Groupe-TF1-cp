document.addEventListener("DOMContentLoaded", function () {
  const estDansSousDossier = window.location.pathname.includes("/component/");
  const prefixe = estDansSousDossier ? "../../" : "./";
  const currentYear = new Date().getFullYear();

  const footerHTML = `
     <footer class="corporate-footer">

        <div class="footer-top">
            <div class="footer-brand">
               <a href="${prefixe}index.html">
                   <div class="footer-logo-container">
                       <img src="${prefixe}photo/logo_sombre-removebg-preview.png" alt="Logo TF1 CP Groupe" class="footer-logo-img">
                   </div>
               </a>
               <p class="footer-desc">Premier groupe média fictif français, TF1 Camping Paradis rassemble chaque semaine des millions de téléspectateurs sur ses antennes et sa plateforme digitale.</p>
            </div>

            <div class="footer-nav">
                <div class="footer-col">
                    <h3>Notre Groupe</h3>
                    <ul>
                        <li><a href="${prefixe}component/histoire/histoire.html">Notre Histoire</a></li>
                        <li><a href="${prefixe}component/direction/direction.html">Notre Direction</a></li>
                        <li><a href="${prefixe}component/filiales/filiales.html">Nos Pôles</a></li>
                        <li><a href="${prefixe}component/chiffres/chiffre.html">Chiffres Clés</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Nos Chaînes & Programmes</h3>
                    <ul>
                        <li><a href="${prefixe}component/chaines/chaines.html">Nos Chaînes</a></li>
                        <li><a href="${prefixe}component/pro/pro.html">Grille des Programmes</a></li>
                        <li><a href="${prefixe}component/renouvellement/renouvellement.html">Renouvellement 2026-2027</a></li>
                        <li><a href="${prefixe}component/Grille de rentrée et d'été/pro.html">Grille Saisonnière</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Presse</h3>
                    <ul>
                        <li><a href="${prefixe}component/presse/presse.html">Espace Presse</a></li>
                        <li><a href="${prefixe}component/pressekit/pressekit.html">Press Kit Média</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h3>Suivez-nous</h3>
                    <div class="social-links">
                        <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                        <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
                        <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-address-bar">
            <i class="fa-solid fa-location-dot"></i>
            <p><strong>Siège Social</strong> — Tour TF1 Camping Paradis, 358 avenue Notre Dame de Paris, 79230 La Garette, France</p>
        </div>

        <div class="footer-bottom">
            <div class="footer-bottom-container">
                <p>&copy; ${currentYear} Groupe TF1 Camping Paradis — Tous droits réservés.</p>
                <ul class="legal-links">
                    <li><a href="${prefixe}component/mentionlegal/mention.html">Mentions Légales</a></li>
                    <li><a href="#">Confidentialité</a></li>
                </ul>
            </div>
        </div>
    </footer>

    <button id="back-to-top" class="back-to-top" title="Retour en haut">
      <i class="fas fa-arrow-up"></i>
    </button>
  `;

  document.body.insertAdjacentHTML("beforeend", footerHTML);

  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        backToTopBtn.style.display = "flex";
      } else {
        backToTopBtn.style.display = "none";
      }
    };
    backToTopBtn.onclick = function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }
});
