import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// NOUVEAU : On importe aussi la fonction signOut pour se déconnecter
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT-pc5WPQEsqPLQUCSTCfdb8Kqw4k8EDU",
  authDomain: "groupe-tf1-cp.firebaseapp.com",
  projectId: "groupe-tf1-cp",
  storageBucket: "groupe-tf1-cp.firebasestorage.app",
  messagingSenderId: "345963750865",
  appId: "1:345963750865:web:c2851dc606b6ceb5ebecf0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Nos éléments HTML
const loginForm = document.getElementById("login-form");
const loginContainer = document.querySelector(".login-container"); // Le bloc de connexion
const dashboardView = document.getElementById("dashboard-view"); // Le tableau de bord
const btnLogout = document.getElementById("btn-logout"); // Bouton déconnexion

// 1. GESTION DE LA CONNEXION
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // CONNEXION RÉUSSIE !
      // 1. On change l'apparence du conteneur principal (enlève le bleu, met le gris plein écran)
      document.getElementById("page-wrapper").classList.add("is-logged-in");

      // 2. On cache le formulaire
      loginContainer.classList.add("hidden");

      // 3. On affiche le tableau de bord
      dashboardView.classList.remove("hidden");
    })
    .catch((error) => {
      alert("Erreur : Identifiant ou mot de passe incorrect.");
      console.error(error.message);
    });
});

// 2. GESTION DE LA DÉCONNEXION
btnLogout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // On recharge simplement la page pour revenir à l'état initial
      window.location.reload();
    })
    .catch((error) => {
      console.error("Erreur lors de la déconnexion", error);
    });
});
