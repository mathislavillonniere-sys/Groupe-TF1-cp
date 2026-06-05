import {
  initializeApp,
  getApps,
  getApp,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
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

// SÉCURITÉ : On réutilise l'application Firebase si elle existe déjà, pour éviter le crash général
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const messaging = getMessaging(app);

// Enregistrement du Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(() => console.log("SW Notifications prêt."))
    .catch((err) => console.error("Erreur SW Notifications:", err));
}

// Attente du chargement de la page pour lier le bouton
window.addEventListener("load", () => {
  const btnNotif = document.getElementById("btn-notifications");
  if (btnNotif) {
    btnNotif.addEventListener("click", DemanderPermissionEtToken);
  }
});

async function DemanderPermissionEtToken() {
  alert("Étape 1 : Clic détecté ! Demande lancée...");

  try {
    // Demande de permission standard compatible PC et iOS récent
    const permission = await Notification.requestPermission();
    alert("Étape 2 : Réponse de l'appareil = " + permission);

    if (permission === "granted") {
      const registration = await navigator.serviceWorker.ready;

      const token = await getToken(messaging, {
        vapidKey:
          "BHRzP9sLEktV6K8c7fs0Jz_7LC9uZBzcEd9VFf1dDy34DkxzRt9Rj7YRSGIFQz83lXuUiXQNmyapdsG--L8MXA0",
        serviceWorkerRegistration: registration,
      });

      if (token) {
        alert("Étape 3 : Token généré ! Enregistrement Firestore...");
        await addDoc(collection(db, "tokens_notifications"), {
          token: token,
          dateAbonnement: new Date(),
          appareil: navigator.userAgent.includes("iPhone") ? "iPhone" : "Autre",
        });
        alert("Abonnement aux notifications réussi !");
      } else {
        alert("Le token généré est vide.");
      }
    } else {
      alert("La permission a été refusée ou bloquée par le système.");
    }
  } catch (error) {
    alert("Erreur dans le processus : " + error.message);
  }
}
