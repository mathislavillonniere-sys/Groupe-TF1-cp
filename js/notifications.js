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
  alert("Étape 1 : Clic détecté ! Tentative de demande de permission...");

  try {
    const permission = await Notification.requestPermission();
    alert("Étape 2 : Réponse d'iOS à la permission : " + permission);

    if (permission === "granted") {
      alert("Étape 3 : Permission accordée, récupération du Service Worker...");
      const registration = await navigator.serviceWorker.ready;

      alert("Étape 4 : Service Worker prêt, génération du Token Firebase...");
      const token = await getToken(messaging, {
        vapidKey: "VOTRE_CLE_VAPID_PUBLIQUE_ICI",
        serviceWorkerRegistration: registration,
      });

      if (token) {
        alert("Étape 5 : Token généré ! Enregistrement dans la base...");
        await addDoc(collection(db, "tokens_notifications"), {
          token: token,
          dateAbonnement: new Date(),
          appareil: "iPhone",
        });
        alert("Succès total ! Enregistré.");
      } else {
        alert("Erreur : Le token retourné est vide.");
      }
    } else {
      alert(
        "iOS a refusé la permission ou elle est déjà bloquée dans vos réglages iPhone.",
      );
    }
  } catch (error) {
    alert("Une erreur est survenue : " + error.message);
    console.error(error);
  }
}
