// js/footer.js (ou component/footer/footer.js selon où vous l'avez rangé)

document.addEventListener("DOMContentLoaded", function () {
  // 1. On vérifie si on est dans un sous-dossier "component"
  const estDansSousDossier = window.location.pathname.includes("/component/");

  // 2. Si oui, on recule de 2 dossiers (../../). Sinon, on reste à la racine (./)
  const prefixe = estDansSousDossier ? "../../" : "./";
  const currentYear = new Date().getFullYear();

  const footerHTML = `
    <footer class="corporate-footer">
        <div class="footer-container">
            
            <div class="footer-col brand-col">
               <a href="${prefixe}index.html">
                   <div class="footer-logo-container">
                       <img src="${prefixe}photo/logo_sombre-removebg-preview.png" alt="Logo TF1 CP Groupe" class="footer-logo-img">
                   </div>
               </a>
                
                <div class="footer-address">
                    <p>
                        <strong>Siège Social</strong><br>
                        Tour TF1 Camping Paradis<br>
                        358 avenue Notre dame de Paris<br>
                        79230 La Garette <br>
                        France
                    </p>
                </div>
            </div>

            <div class="footer-col">
                <h3>Le Groupe</h3>
                <ul>
                    <li><a href="${prefixe}index.html">Accueil</a></li>
                    <li><a href="${prefixe}component/direction/direction.html">Direction</a></li>
                    <li><a href="${prefixe}component/organigramme/organigramme.html">Organigramme</a></li>
                    <li><a href="${prefixe}component/filiales/filiales.html">Nos Pôles</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Espace Presse</h3>
                <ul>
                    <li><a href="${prefixe}component/presse/presse.html">Communiqués</a></li>
                    <li><a href="#">Médiathèque</a></li>
                    <li><a href="#">Contacts</a></li>
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

        <div class="footer-bottom">
            <div class="footer-bottom-container">
                <p>&copy; ${currentYear} Groupe TF1 Camping Paradis - Tous droits réservés.</p>
                <ul class="legal-links">
                    <li><a href="${prefixe}component/mentionlegal/mention.html">Mentions Légales</a></li>
                    <li><a href="#">Confidentialité</a></li>
                </ul>
            </div>
        </div>
    </footer>

    <button id="backToTop" class="back-to-top" title="Retour en haut">
        <i class="fa-solid fa-arrow-up"></i>
    </button>
    `;

  document.body.insertAdjacentHTML("beforeend", footerHTML);

  // --- Logique du bouton Retour en haut ---
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    };

    backToTopBtn.onclick = function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }
});
