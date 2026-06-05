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

async function activerNotifications() {
  try {
    // 1. On force l'enregistrement du Service Worker pour iOS
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
      );
      console.log("Service Worker enregistré !");

      // 2. On demande la permission
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Permission accordée !");

        // 3. On récupère le Token en lui passant le service worker enregistré
        const token = await getToken(messaging, {
          vapidKey:
            "BHRzP9sLEktV6K8c7fs0Jz_7LC9uZBzcEd9VFf1dDy34DkxzRt9Rj7YRSGIFQz83lXuUiXQNmyapdsG--L8MXA0",
          serviceWorkerRegistration: registration,
        });

        if (token) {
          console.log("Token généré :", token);
          await addDoc(collection(db, "tokens_notifications"), {
            token: token,
            dateAbonnement: new Date(),
          });
        }
      }
    }
  } catch (error) {
    console.error("Erreur notifications :", error);
  }
}

// On lance la détection
window.addEventListener("load", () => {
  // On l'exécute directement pour tester, même si on est sur navigateur
  activerNotifications();
});
