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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(() => console.log("SW Notifications OK"))
    .catch((err) => console.error("Erreur SW:", err));
}

// FIX ANTI-ÉCRASEMENT : On cherche le bouton en boucle toutes les 200ms
// tant qu'il n'est pas trouvé et bindé. Aucun autre script ne pourra écraser ça.
const chercherEtAttacherBouton = setInterval(() => {
  const btnNotif = document.getElementById("btn-notifications");

  if (btnNotif) {
    // Sécurité : on supprime un éventuel ancien écouteur fantôme pour éviter les doublons
    btnNotif.removeEventListener("click", DemanderPermissionEtToken);

    // On attache notre fonction proprement
    btnNotif.addEventListener("click", DemanderPermissionEtToken);

    console.log(
      "Bouton notifications sécurisé et protégé contre l'écrasement !",
    );
    clearInterval(chercherEtAttacherBouton); // On arrête de chercher puisqu'on l'a
  }
}, 200);

async function DemanderPermissionEtToken() {
  // 1. Alerte de diagnostic immédiat
  alert(
    "Vérification du statut initial sur votre iPhone : " +
      Notification.permission,
  );

  if (Notification.permission === "denied") {
    alert(
      "⚠️ Apple bloque l'affichage : Vous avez désactivé les notifications pour cette app. Pour corriger :\n1. Ouvrez les Réglages de l'iPhone\n2. Allez dans Réglages > Notifications > TF1 CP\n3. Activez 'Autoriser les notifications'.",
    );
    return;
  }

  try {
    // 2. Utilisation de la méthode de secours par promesse propre
    const permission = await window.Notification.requestPermission();

    alert("Résultat de la demande système : " + permission);

    if (permission === "granted") {
      const registration = await navigator.serviceWorker.ready;

      const token = await getToken(messaging, {
        vapidKey:
          "BHRzP9sLEktV6K8c7fs0Jz_7LC9uZBzcEd9VFf1dDy34DkxzRt9Rj7YRSGIFQz83lXuUiXQNmyapdsG--L8MXA0",
        serviceWorkerRegistration: registration,
      });

      if (token) {
        await addDoc(collection(db, "tokens_notifications"), {
          token: token,
          dateAbonnement: new Date(),
          appareil: "iPhone (Forcé)",
        });
        alert("✅ Succès ! Votre iPhone est bien enregistré.");
      }
    } else {
      // Si l'iPhone ne fait RIEN (pas de pop-up, pas de changement), on affiche ce guide :
      alert(
        "📱 Configurer votre iPhone :\nSi aucune pop-up n'est apparue, allez dans Réglages > Réglages Safari > Avancé > Feature Flags > Activez 'Push Notifications'.",
      );
    }
  } catch (error) {
    alert("Erreur capturée : " + error.message);
  }
}
