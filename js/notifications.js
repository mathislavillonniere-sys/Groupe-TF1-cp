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

// 1. Enregistrement du Service Worker dès le chargement de la page
window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((reg) =>
        console.log("Service Worker enregistré avec succès !", reg.scope),
      )
      .catch((err) =>
        console.error("Échec de l'enregistrement du Service Worker :", err),
      );
  }

  // Écoute du clic sur le bouton
  const btnNotif = document.getElementById("btn-notifications");
  if (btnNotif) {
    btnNotif.addEventListener("click", DemanderPermissionEtToken);
  }
});

// 2. Fonction déclenchée par le clic (Action directe exigée par iOS)
async function DemanderPermissionEtToken() {
  console.log("Clic détecté : Demande de permission immédiate...");

  try {
    // Cette ligne doit s'exécuter en premier sans aucun 'await' avant elle
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      console.log("Permission accordée par l'utilisateur !");

      // La permission est là, on récupère le Service Worker qui est déjà prêt
      const registration = await navigator.serviceWorker.ready;

      // Récupération du Token Firebase
      const token = await getToken(messaging, {
        vapidKey:
          "BHRzP9sLEktV6K8c7fs0Jz_7LC9uZBzcEd9VFf1dDy34DkxzRt9Rj7YRSGIFQz83lXuUiXQNmyapdsG--L8MXA0", // Mettez votre clé générée ici
        serviceWorkerRegistration: registration,
      });

      if (token) {
        console.log("Token généré avec succès :", token);

        // Sauvegarde dans Firestore
        await addDoc(collection(db, "tokens_notifications"), {
          token: token,
          dateAbonnement: new Date(),
          appareil: navigator.userAgent.includes("iPhone") ? "iPhone" : "Autre",
        });

        alert("Félicitations ! Vous êtes abonné aux notifications.");
      }
    } else {
      alert(
        "La permission a été refusée. Modifiez les réglages de votre iPhone si nécessaire.",
      );
    }
  } catch (error) {
    console.error("Erreur lors du processus :", error);
  }
}
