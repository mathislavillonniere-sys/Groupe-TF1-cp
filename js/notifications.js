import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getMessaging,
  getToken,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT-pc5WPQEsqPLQUCSTCfdb8Kqw4k8EDU",
  authDomain: "groupe-tf1-cp.firebaseapp.com",
  projectId: "groupe-tf1-cp",
  storageBucket: "groupe-tf1-cp.firebasestorage.app",
  messagingSenderId: "345963750865",
  appId: "1:345963750865:web:c2851dc606b6ceb5ebecf0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

// Enregistrement du Service Worker immédiatement
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((reg) => console.log("SW Enregistré avec succès !"))
    .catch((err) => console.error("Erreur d'enregistrement du SW :", err));
}

// Attente du chargement complet du DOM pour lier le bouton
document.addEventListener("DOMContentLoaded", () => {
  const btnNotif = document.getElementById("btn-notifications");
  if (btnNotif) {
    console.log("Bouton de notification détecté immédiatement dans la page.");
    btnNotif.addEventListener("click", DemanderPermissionEtToken);
  } else {
    // Si le bouton n'est pas encore là, on utilise un intervalle rapide pour le chasser
    const verifBouton = setInterval(() => {
      const btnSecours = document.getElementById("btn-notifications");
      if (btnSecours) {
        btnSecours.addEventListener("click", DemanderPermissionEtToken);
        clearInterval(verifBouton);
      }
    }, 100);
  }
});

async function DemanderPermissionEtToken() {
  alert("Étape 1 : Clic détecté ! Demande de permission lancée...");

  try {
    const permission = await Notification.requestPermission();
    alert("Étape 2 : Réponse de l'iPhone = " + permission);

    if (permission === "granted") {
      const registration = await navigator.serviceWorker.ready;

      // REMPLACEZ BIEN PAR VOTRE CLÉ CLOUD MESSAGING GENERÉE SUR FIREBASE
      const token = await getToken(messaging, {
        vapidKey:
          "BHRzP9sLEktV6K8c7fs0Jz_7LC9uZBzcEd9VFf1dDy34DkxzRt9Rj7YRSGIFQz83lXuUiXQNmyapdsG--L8MXA0",
        serviceWorkerRegistration: registration,
      });

      if (token) {
        alert("Étape 3 : Token généré ! Enregistrement...");
        await addDoc(collection(db, "tokens_notifications"), {
          token: token,
          dateAbonnement: new Date(),
          appareil: "iPhone",
        });
        alert("Abonnement réussi !");
      } else {
        alert("Le token généré est vide.");
      }
    } else {
      alert("La permission a été refusée ou bloquée par l'iPhone.");
    }
  } catch (error) {
    alert("Erreur système : " + error.message);
  }
}
