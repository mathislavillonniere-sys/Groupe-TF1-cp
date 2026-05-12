import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const app = initializeApp({
  apiKey: "AIzaSyDT-pc5WPQEsqPLQUCSTCfdb8Kqw4k8EDU",
  authDomain: "groupe-tf1-cp.firebaseapp.com",
  projectId: "groupe-tf1-cp",
});
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const boxPresse = document.getElementById("presse-list-container");
  const boxKit = document.getElementById("pressekit-list-container");

  if (!boxPresse && !boxKit) return;

  // On cible la collection "presse_documents" (séparée des actus)
  onSnapshot(
    query(collection(db, "presse_documents"), orderBy("dateAjout", "desc")),
    (snapshot) => {
      if (boxPresse) boxPresse.innerHTML = "";
      if (boxKit) boxKit.innerHTML = "";

      snapshot.forEach((doc) => {
        const d = doc.data();
        const html = `
                <div class="presse-item">
                    <div>
                        <strong>${d.date_texte}</strong>
                        <span>${d.titre}</span>
                    </div>
                    <a href="../../pdf/${d.nom_pdf}" target="_blank">Télécharger le PDF</a>
                </div>`;

        if (d.categorie === "presse" && boxPresse) boxPresse.innerHTML += html;
        if (d.categorie === "pressekit" && boxKit) boxKit.innerHTML += html;
      });
    },
  );
});
