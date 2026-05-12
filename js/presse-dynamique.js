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
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const boxPresse = document.getElementById("presse-list-container");
  const boxKit = document.getElementById("pressekit-list-container");

  if (!boxPresse && !boxKit) return;

  onSnapshot(
    query(collection(db, "communiques"), orderBy("dateAjout", "desc")),
    (snapshot) => {
      if (boxPresse) boxPresse.innerHTML = "";
      if (boxKit) boxKit.innerHTML = "";

      const maintenant = new Date();

      snapshot.forEach((doc) => {
        const d = doc.data();

        // --- FILTRE 1 : SI LA DATE EST DANS LE FUTUR, ON CACHE ---
        if (d.dateAjout && typeof d.dateAjout.toDate === "function") {
          if (d.dateAjout.toDate() > maintenant) {
            return;
          }
        }

        // --- FILTRE 2 : S'IL N'Y A PAS DE PDF, ON CACHE DE LA LISTE PRESSE ---
        if (!d.nom_pdf || d.nom_pdf.trim() === "") {
          return; // L'article n'ira pas dans la liste Espace Presse, il restera juste sur l'accueil !
        }

        // Formatage de la date
        let dateTexte = "Récemment";
        if (d.dateAjout && typeof d.dateAjout.toDate === "function") {
          dateTexte = d.dateAjout
            .toDate()
            .toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
        }

        const html = `
                <div class="presse-item">
                    <div>
                        <strong>${dateTexte}</strong>
                        <span>${d.titre}</span>
                    </div>
                    <a href="../../pdf/${d.nom_pdf}" target="_blank">Télécharger le PDF</a>
                </div>`;

        // Tri par page
        if (d.categorie === "presse" && boxPresse) boxPresse.innerHTML += html;
        if (d.categorie === "pressekit" && boxKit) boxKit.innerHTML += html;
      });
    },
  );
});
