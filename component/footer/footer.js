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
                    <li><a href="${prefixe}component/confidentialite/confidentialite.html">Confidentialité</a></li>
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
  // =========================================
  // POP-UP COOKIES RGPD & RÉGLAGES AVANCÉS
  // =========================================

  function initialiserBandeauCookies() {
    // 1. On vérifie la mémoire
    try {
      if (localStorage.getItem("tf1cp_cookies")) return;
    } catch (e) {
      console.warn("Navigation privée : mémoire bloquée.");
    }

    // 2. Création de l'Overlay (fond noir)
    const overlay = document.createElement("div");
    overlay.className = "cookie-overlay";

    // 3. Création du Pop-up
    const popup = document.createElement("div");
    popup.className = "cookie-popup";

    // Code HTML injecté
    popup.innerHTML = `
      <div class="cookie-header">
        <h3><i class="fas fa-shield-alt" style="color: #e31e24;"></i> Vos choix de cookies</h3>
      </div>
      
      <div class="cookie-body" id="cookie-main-view">
        <p>Le Groupe TF1 Camping Paradis utilise des cookies pour assurer le bon fonctionnement de la plateforme, réaliser des statistiques d'audience et vous proposer des contenus adaptés. <a href="./component/confidentialite/confidentialite.html">En savoir plus</a>.</p>
      </div>

      <div class="cookie-settings" id="cookie-settings-view">
        <div class="cookie-option">
          <div>
            <strong>Cookies strictement nécessaires</strong>
            <span>Indispensables pour naviguer sur le site.</span>
          </div>
          <label class="switch">
            <input type="checkbox" checked disabled>
            <span class="slider"></span>
          </label>
        </div>
        <div class="cookie-option">
          <div>
            <strong>Mesure d'audience (Analytics)</strong>
            <span>Nous aide à analyser la fréquentation du site.</span>
          </div>
          <label class="switch">
            <input type="checkbox" id="toggle-analytics" checked>
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="cookie-buttons">
        <button id="btn-param-cookies" class="btn-cookie btn-param">Personnaliser mes choix</button>
        <button id="btn-refuser-cookies" class="btn-cookie btn-refuser">Tout refuser</button>
        <button id="btn-accepter-cookies" class="btn-cookie btn-accepter">Tout accepter</button>
        <button id="btn-save-cookies" class="btn-cookie btn-save">Enregistrer mes préférences</button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // 4. Animation d'apparition
    setTimeout(() => {
      overlay.classList.add("show");
      popup.classList.add("show");
    }, 50);

    // 5. Récupération des boutons
    const btnParam = document.getElementById("btn-param-cookies");
    const btnAccepter = document.getElementById("btn-accepter-cookies");
    const btnRefuser = document.getElementById("btn-refuser-cookies");
    const btnSave = document.getElementById("btn-save-cookies");
    const viewSettings = document.getElementById("cookie-settings-view");
    const toggleAnalytics = document.getElementById("toggle-analytics");

    // Action : Cliquer sur "Personnaliser"
    btnParam.addEventListener("click", () => {
      viewSettings.style.display = "block"; // Affiche les toggles
      btnParam.style.display = "none"; // Cache "Personnaliser"
      btnAccepter.style.display = "none"; // Cache "Tout Accepter"
      btnRefuser.style.display = "none"; // Cache "Tout Refuser"
      btnSave.style.display = "block"; // Affiche "Enregistrer"
    });

    // Fonction commune de fermeture et sauvegarde
    const fermerPopup = (preferences) => {
      try {
        // Sauvegarde un VRAI objet de réglages (ex: {essentiel: true, analytics: false})
        localStorage.setItem("tf1cp_cookies", JSON.stringify(preferences));
      } catch (e) {}

      overlay.classList.remove("show");
      popup.classList.remove("show");

      setTimeout(() => {
        overlay.remove();
        popup.remove();
      }, 400); // Attend la fin de l'animation pour supprimer du code
    };

    // Boutons d'action
    btnAccepter.addEventListener("click", () =>
      fermerPopup({ essentiel: true, analytics: true }),
    );
    btnRefuser.addEventListener("click", () =>
      fermerPopup({ essentiel: true, analytics: false }),
    );
    btnSave.addEventListener("click", () => {
      fermerPopup({ essentiel: true, analytics: toggleAnalytics.checked });
    });
  }

  // Lancement automatique
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiserBandeauCookies);
  } else {
    initialiserBandeauCookies();
  }
});
