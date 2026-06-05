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

// Demande d'autorisation et récupération du Token
async function activerNotifications() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Permission accordée !");

      // /!\ ATTENTION : Il vous faudra générer votre clé VAPID sur Firebase (voir Étape 4)
      const token = await getToken(messaging, {
        vapidKey: "V3t5ahSu3-ojIU4VNi6i22K3MgrXtU1kJTMIQogxSTs",
      });

      if (token) {
        console.log("Token de l'appareil :", token);
        // On sauvegarde le token dans Firestore pour savoir à qui envoyer les notifications
        await addDoc(collection(db, "tokens_notifications"), {
          token: token,
          dateAbonnement: new Date(),
        });
      }
    } else {
      console.log("Permission refusée.");
    }
  } catch (error) {
    console.error("Erreur lors de l'activation des notifications :", error);
  }
}

// On lance la demande dès que la page est chargée (ou liez cette fonction à un bouton)
window.addEventListener("load", () => {
  // Optionnel : ne demander que si l'application est installée sur l'écran d'accueil
  if (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone
  ) {
    activerNotifications();
  }
});
