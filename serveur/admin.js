import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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
const db = getFirestore(app);

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
// ==========================================
// 3. AJOUTER UNE SÉRIE DANS LA BASE DE DONNÉES
// ==========================================
const formAddSerie = document.getElementById("form-add-serie");

// Si le formulaire existe sur la page (pour éviter les erreurs)
if (formAddSerie) {
  formAddSerie.addEventListener("submit", async (e) => {
    e.preventDefault(); // Empêche la page de se recharger

    // On récupère les valeurs tapées par l'admin
    const titre = document.getElementById("serie-titre").value;
    const saison = document.getElementById("serie-saison").value;
    const date = document.getElementById("serie-date").value;
    const statut = document.getElementById("serie-statut").value;

    try {
      // On envoie tout ça dans une "collection" (un dossier) nommé "renouvellements"
      await addDoc(collection(db, "renouvellements"), {
        titre: titre,
        saison: saison,
        date: date,
        statut: statut,
        ajouteLe: new Date(), // Ça garde une trace de quand tu l'as ajouté
      });

      alert("Succès ! La série a été ajoutée à la base de données.");
      formAddSerie.reset(); // On vide les cases du formulaire
    } catch (error) {
      console.error("Erreur lors de l'ajout : ", error);
      alert("Une erreur est survenue.");
    }
  });
}
// ==========================================
// 4. AFFICHER ET SUPPRIMER LES SÉRIES
// ==========================================
const listSeriesAdmin = document.getElementById("list-series-admin");

if (listSeriesAdmin) {
  // On crée une requête triée par date d'ajout (la plus récente en haut)
  const q = query(
    collection(db, "renouvellements"),
    orderBy("ajouteLe", "desc"),
  );

  // onSnapshot écoute la base en temps réel : si tu ajoutes une série, elle apparaît direct !
  onSnapshot(q, (snapshot) => {
    listSeriesAdmin.innerHTML = ""; // On vide la liste avant de la reconstruire

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const id = docSnap.id;

      const row = `
                <tr>
                    <td><strong>${data.titre}</strong></td>
                    <td>${data.saison}</td>
                    <td><span class="badge badge-${data.statut}">${data.statut}</span></td>
                    <td>
                        <button class="btn-delete" data-id="${id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
      listSeriesAdmin.innerHTML += row;
    });

    // On active les boutons de suppression après avoir créé les lignes
    document.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const docId = btn.getAttribute("data-id");
        if (confirm("Supprimer ce programme définitivement ?")) {
          await deleteDoc(doc(db, "renouvellements", docId));
        }
      });
    });
  });
}
