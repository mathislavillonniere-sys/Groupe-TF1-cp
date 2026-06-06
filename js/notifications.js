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

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const messaging = getMessaging(app);

// ── Vérifie qu'on est bien en PWA standalone (obligatoire iOS)
const estPWA = window.navigator.standalone === true;

// ── Enregistre le SW dès le chargement (pas en attente du clic)
let swRegistration = null;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js", { scope: "/" })
    .then((reg) => {
      swRegistration = reg;
      console.log("SW prêt");
    })
    .catch((err) => console.error("Erreur SW:", err));
}

// ── Attache le bouton
const chercherBouton = setInterval(() => {
  const btn = document.getElementById("btn-notifications");
  if (btn) {
    clearInterval(chercherBouton);

    // Si pas en PWA standalone, on prévient
    if (!estPWA) {
      btn.textContent = "Ajouter à l'écran d'accueil d'abord";
      btn.disabled = true;
      return;
    }

    btn.addEventListener("click", demanderNotifications);
  }
}, 200);

async function demanderNotifications() {
  // iOS exige que ce soit dans un vrai geste utilisateur — c'est bon ici (clic)

  if (Notification.permission === "denied") {
    alert(
      "Notifications bloquées. Va dans Réglages > Notifications > TF1 CP pour les réactiver.",
    );
    return;
  }

  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert(
        "Notifications refusées. Tu peux changer ça dans les Réglages iPhone.",
      );
      return;
    }

    // Attend que le SW soit bien prêt
    const registration = await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey:
        "BHRzP9sLEktV6K8c7fs0Jz_7LC9uZBzcEd9VFf1dDy34DkxzRt9Rj7YRSGIFQz83lXuUiXQNmyapdsG--L8MXA0",
      serviceWorkerRegistration: registration,
    });

    if (token) {
      // Évite les doublons dans Firestore
      await addDoc(collection(db, "tokens_notifications"), {
        token,
        date: new Date(),
        appareil: navigator.userAgent,
      });
      alert("✅ Notifications activées !");
    } else {
      alert(
        "Token vide — vérifie que le domaine Vercel est bien autorisé dans la console Firebase.",
      );
    }
  } catch (err) {
    alert("Erreur : " + err.message);
  }
}
