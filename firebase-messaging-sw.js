importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js",
);

const firebaseConfig = {
  apiKey: "AIzaSyDT-pc5WPQEsqPLQUCSTCfdb8Kqw4k8EDU",
  authDomain: "groupe-tf1-cp.firebaseapp.com",
  projectId: "groupe-tf1-cp",
  storageBucket: "groupe-tf1-cp.firebasestorage.app",
  messagingSenderId: "345963750865",
  appId: "1:345963750865:web:c2851dc606b6ceb5ebecf0",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Code spécifique pour obliger iOS à écouter en tâche de fond
messaging.onBackgroundMessage((payload) => {
  console.log("Notification reçue en arrière-plan: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/photo/logo_claire-removebg-preview.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
