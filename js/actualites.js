import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
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

document.addEventListener("DOMContentLoaded", () => {
  const newsTrack = document.getElementById("news-track");
  if (newsTrack) {
    // On cible UNIQUEMENT la collection "actualites"
    onSnapshot(
      query(collection(db, "actualites"), orderBy("dateAjout", "desc")),
      (snapshot) => {
        newsTrack.innerHTML = "";
        snapshot.forEach((doc) => {
          const d = doc.data();

          let texteBadge =
            d.badge === "strategie"
              ? "STRATÉGIE"
              : d.badge === "programmes"
                ? "PROGRAMMES"
                : "ENGAGEMENT";
          let boutonPDF = d.nom_pdf
            ? `<a href="pdf/${d.nom_pdf}" class="read-more" target="_blank">Lire le communiqué <i class="fas fa-arrow-right"></i></a>`
            : "";

          newsTrack.innerHTML += `
                    <article class="news-card">
                      <div class="news-img-box">
                        <span class="news-badge badge-${d.badge}">${texteBadge}</span>
                        <img src="./photo/${d.nom_image}" alt="${texteBadge}" />
                      </div>
                      <div class="news-content">
                        <h3>${d.titre}</h3>
                        <p>${d.description}</p>
                        ${boutonPDF}
                      </div>
                    </article>`;
        });
      },
    );
  }
});
