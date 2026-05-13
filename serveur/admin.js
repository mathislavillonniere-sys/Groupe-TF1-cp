import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT-pc5WPQEsqPLQUCSTCfdb8Kqw4k8EDU",
  authDomain: "groupe-tf1-cp.firebaseapp.com",
  projectId: "groupe-tf1-cp",
  storageBucket: "groupe-tf1-cp.firebasestorage.app",
  messagingSenderId: "345963750865",
  appId: "1:345963750865:web:c2851dc606b6ceb5ebecf0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let isEditMode = false;
let editDocId = null;

// CONNEXION
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(
    auth,
    document.getElementById("email").value,
    document.getElementById("password").value,
  )
    .then(() => {
      document.getElementById("page-wrapper").classList.add("is-logged-in");
      document.getElementById("login-container").classList.add("hidden");
      document.getElementById("dashboard-view").classList.remove("hidden");
    })
    .catch(() => alert("Identifiant ou mot de passe incorrect."));
});
document
  .getElementById("btn-logout")
  .addEventListener("click", () =>
    signOut(auth).then(() => window.location.reload()),
  );

// NAVIGATION
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-item, .content-section")
      .forEach((el) => el.classList.remove("active"));
    item.classList.add("active");
    document
      .getElementById(item.getAttribute("data-target"))
      .classList.add("active");
  });
});

// SÉRIES
onSnapshot(
  query(collection(db, "renouvellements"), orderBy("ajouteLe", "desc")),
  (snapshot) => {
    document.getElementById("list-series-admin").innerHTML = "";
    snapshot.forEach((docSnap) => {
      const d = docSnap.data();
      document.getElementById("list-series-admin").innerHTML +=
        `<tr><td><strong>${d.titre}</strong></td><td>${d.saison}</td><td><span class="badge badge-${d.statut}">${d.statut}</span></td><td><button class="btn-delete" data-id="${docSnap.id}" data-type="serie"><i class="fas fa-trash"></i></button></td></tr>`;
    });
  },
);
// FORMULAIRE AJOUT SÉRIE
const formAddSerie = document.getElementById("form-add-serie");

if (formAddSerie) {
  formAddSerie.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titre = document.getElementById("serie-titre").value.trim();
    const saison = document.getElementById("serie-saison").value.trim();
    const date = document.getElementById("serie-date").value.trim();
    const statut = document.getElementById("serie-statut").value;

    if (!titre || !saison || !date || !statut) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    try {
      await addDoc(collection(db, "renouvellements"), {
        titre,
        saison,
        date,
        statut,
        ajouteLe: new Date(),
      });
      alert("Programme ajouté avec succès !");
      formAddSerie.reset();
    } catch (error) {
      console.error("Erreur Firebase :", error);
      alert("Erreur lors de l'ajout. Vérifie la console.");
    }
  });
}

// FORMULAIRE PRESSE
const formAddPresse = document.getElementById("form-add-presse");
const checkboxUne = document.getElementById("presse-une");
const uneOptions = document.getElementById("une-options");
const btnSubmitPresse = document.querySelector("#form-add-presse .btn-submit");

if (checkboxUne) {
  checkboxUne.addEventListener(
    "change",
    () => (uneOptions.style.display = checkboxUne.checked ? "block" : "none"),
  );
}

if (formAddPresse) {
  formAddPresse.addEventListener("submit", async (e) => {
    e.preventDefault();

    // On récupère la date programmée ou on met "maintenant"
    const datePubInput = document.getElementById("presse-date-pub").value;
    const datePublication = datePubInput ? new Date(datePubInput) : new Date();

    const donnees = {
      titre: document.getElementById("presse-titre").value,
      categorie: document.getElementById("presse-categorie").value,
      nom_pdf: document.getElementById("presse-fichier").value,
      a_la_une: checkboxUne.checked,
      badge: checkboxUne.checked
        ? document.getElementById("presse-badge").value
        : "",
      ordre: checkboxUne.checked
        ? parseInt(document.getElementById("presse-ordre").value) || 99
        : 99,
      nom_image: checkboxUne.checked
        ? document.getElementById("presse-image").value
        : "",
      description: checkboxUne.checked
        ? document.getElementById("presse-desc").value
        : "",
      dateAjout: datePublication, // C'est ici que la programmation se joue !
    };

    try {
      if (isEditMode) {
        await updateDoc(doc(db, "communiques", editDocId), donnees);
        alert("Mis à jour !");
        isEditMode = false;
        editDocId = null;
        btnSubmitPresse.innerText = "Publier le communiqué";
      } else {
        await addDoc(collection(db, "communiques"), donnees);
        alert("Ajouté !");
      }
      formAddPresse.reset();
      uneOptions.style.display = "none";
    } catch (error) {
      alert("Erreur !");
    }
  });
}

// TABLEAU PRESSE (AVEC INDICATEUR DE PROGRAMMATION)
onSnapshot(
  query(collection(db, "communiques"), orderBy("dateAjout", "desc")),
  (snapshot) => {
    const list = document.getElementById("list-presse-admin");
    if (!list) return;
    list.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const d = docSnap.data();
      const dateObj = d.dateAjout ? d.dateAjout.toDate() : new Date();
      const isScheduled = dateObj > new Date();

      // Petit badge visuel pour toi dans l'admin
      const statusLabel = isScheduled
        ? `<br><span style="color: #f59e0b; font-size: 0.8em;"><i class="fas fa-clock"></i> Programmé (${dateObj.toLocaleString()})</span>`
        : `<br><span style="color: #16a34a; font-size: 0.8em;"><i class="fas fa-check-circle"></i> En ligne</span>`;

      list.innerHTML += `
      <tr>
          <td><strong>${d.titre}</strong> ${statusLabel}</td>
          <td><span class="badge badge-nouveau">${d.categorie}</span></td>
          <td>${d.a_la_une ? "OUI" : "NON"}</td>
          <td>
              <button class="btn-edit" data-id="${docSnap.id}"><i class="fas fa-edit"></i></button>
              <button class="btn-delete" data-id="${docSnap.id}" data-type="presse"><i class="fas fa-trash"></i></button>
          </td>
      </tr>`;
    });
  },
);

// CLICS SUPPRIMER / MODIFIER
document.addEventListener("click", async (e) => {
  const btnDel = e.target.closest(".btn-delete");
  const btnEdit = e.target.closest(".btn-edit");

  if (btnDel) {
    if (confirm("Supprimer ?")) {
      const col =
        btnDel.getAttribute("data-type") === "serie"
          ? "renouvellements"
          : "communiques";
      await deleteDoc(doc(db, col, btnDel.getAttribute("data-id")));
    }
  }

  if (btnEdit) {
    const id = btnEdit.getAttribute("data-id");
    isEditMode = true;
    editDocId = id;
    onSnapshot(doc(db, "communiques", id), (snap) => {
      const d = snap.data();
      if (d) {
        document.getElementById("presse-titre").value = d.titre;
        document.getElementById("presse-categorie").value = d.categorie;
        document.getElementById("presse-fichier").value = d.nom_pdf;
        checkboxUne.checked = d.a_la_une;
        uneOptions.style.display = d.a_la_une ? "block" : "none";
        if (d.a_la_une) {
          document.getElementById("presse-badge").value = d.badge || "";
          document.getElementById("presse-ordre").value = d.ordre || "";
          document.getElementById("presse-image").value = d.nom_image || "";
          document.getElementById("presse-desc").value = d.description || "";
        }
        // Gestion de l'affichage de la date dans le champ
        if (d.dateAjout) {
          const date = d.dateAjout.toDate();
          date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
          document.getElementById("presse-date-pub").value = date
            .toISOString()
            .slice(0, 16);
        }
        btnSubmitPresse.innerText = "Enregistrer les modifications";
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
});
