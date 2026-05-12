import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyDT-pc5WPQEsqPLQUCSTCfdb8Kqw4k8EDU",
  authDomain: "groupe-tf1-cp.firebaseapp.com",
  projectId: "groupe-tf1-cp",
});
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const newsTrack = document.getElementById("news-track");
  if (newsTrack) {
    onSnapshot(query(collection(db, "communiques")), (snapshot) => {
      newsTrack.innerHTML = "";
      let actus = [];
      const maintenant = new Date();

      snapshot.forEach((doc) => {
        const d = doc.data();

        // --- SÉCURITÉ ANTI-CRASH ---
        // Si la date existe, on vérifie si elle est dans le futur
        if (d.dateAjout && typeof d.dateAjout.toDate === "function") {
          if (d.dateAjout.toDate() > maintenant) {
            return; // On ignore car c'est programmé pour plus tard
          }
        }

        if (d.a_la_une === true) {
          actus.push(d);
        }
      });

      // Tri par ordre
      actus.sort((a, b) => (a.ordre || 99) - (b.ordre || 99));

      // Affichage
      actus.forEach((d) => {
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
                        <img src="./photo/${d.nom_image}" alt="${texteBadge}" onerror="this.src='./photo/logo_claire-removebg-preview.png'" />
                      </div>
                      <div class="news-content">
                        <h3>${d.titre}</h3>
                        <p>${d.description}</p>
                        ${boutonPDF}
                      </div>
                    </article>`;
      });
    });
  }
});
