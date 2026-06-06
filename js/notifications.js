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
  query,
  where,
  getDocs,
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

// ── Vérifie qu'on est bien en mode PWA standalone (obligatoire sur iOS)
const estPWA = window.navigator.standalone === true;

// ── Enregistre le Service Worker immédiatement au chargement
// (pas en attente du clic — iOS exige qu'il soit prêt avant getToken)
let swRegistration = null;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js", { scope: "/" })
    .then((reg) => {
      swRegistration = reg;
      console.log("✅ Service Worker notifications enregistré");
    })
    .catch((err) => console.error("❌ Erreur SW:", err));
}

// ── Attache le bouton dès qu'il est disponible dans le DOM
const chercherBouton = setInterval(() => {
  const btn = document.getElementById("btn-notifications");
  if (!btn) return;

  clearInterval(chercherBouton);

  // Si l'utilisateur n'est pas en mode PWA standalone, on désactive le bouton
  if (!estPWA) {
    btn.textContent = "📱 Ajouter à l'écran d'accueil pour activer";
    btn.disabled = true;
    btn.style.opacity = "0.6";
    btn.style.cursor = "not-allowed";
    return;
  }

  // Si déjà autorisé, on met le bouton à jour
  if (Notification.permission === "granted") {
    btn.textContent = "🔔 Notifications activées";
    btn.disabled = true;
    return;
  }

  btn.addEventListener("click", demanderNotifications);
}, 200);

async function demanderNotifications() {
  if (Notification.permission === "denied") {
    alert(
      "🔕 Notifications bloquées.\n\nPour les réactiver :\nRéglages iPhone → Notifications → TF1 CP → Activer",
    );
    return;
  }

  try {
    // Demande la permission — DOIT être dans un vrai clic utilisateur
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert(
        "Notifications refusées. Tu peux changer ça dans Réglages → Notifications.",
      );
      return;
    }

    // Attend que le Service Worker soit complètement prêt
    const registration = await navigator.serviceWorker.ready;

    // Récupère le token FCM
    const token = await getToken(messaging, {
      vapidKey:
        "BHRzP9sLEktV6K8c7fs0Jz_7LC9uZBzcEd9VFf1dDy34DkxzRt9Rj7YRSGIFQz83lXuUiXQNmyapdsG--L8MXA0",
      serviceWorkerRegistration: registration,
    });

    if (!token) {
      alert(
        "❌ Token vide.\n\nVérifie que le domaine Vercel est autorisé dans :\nFirebase Console → Project Settings → Cloud Messaging",
      );
      return;
    }

    // Évite les doublons : vérifie si ce token existe déjà dans Firestore
    const q = query(
      collection(db, "tokens_notifications"),
      where("token", "==", token),
    );
    const existing = await getDocs(q);

    if (existing.empty) {
      await addDoc(collection(db, "tokens_notifications"), {
        token,
        date: new Date(),
        appareil: navigator.userAgent,
        plateforme: "iOS PWA",
      });
    }

    // Met à jour le bouton
    const btn = document.getElementById("btn-notifications");
    if (btn) {
      btn.textContent = "🔔 Notifications activées";
      btn.disabled = true;
    }

    alert(
      "✅ Notifications activées ! Tu recevras une alerte à chaque nouveau communiqué.",
    );
  } catch (err) {
    console.error("Erreur notifications:", err);
    alert(
      "❌ Erreur : " +
        err.message +
        "\n\nSi l'erreur persiste, vérifie :\n- Que tu es bien en mode PWA (écran d'accueil)\n- Que le domaine Vercel est autorisé dans Firebase",
    );
  }
}
