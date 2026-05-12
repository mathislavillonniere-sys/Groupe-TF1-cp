import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
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

// ==========================================
// 1. GESTION DE LA CONNEXION & DECONNEXION
// ==========================================
const loginForm = document.getElementById("login-form");
const loginContainer = document.getElementById("login-container");
const dashboardView = document.getElementById("dashboard-view");
const btnLogout = document.getElementById("btn-logout");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("page-wrapper").classList.add("is-logged-in");
      loginContainer.classList.add("hidden");
      dashboardView.classList.remove("hidden");
    })
    .catch((error) => {
      alert("Erreur : Identifiant ou mot de passe incorrect.");
      console.error(error.message);
    });
});

btnLogout.addEventListener("click", () => {
  signOut(auth).then(() => window.location.reload());
});

// ==========================================
// 2. NAVIGATION DANS LA SIDEBAR (ONGLETS)
// ==========================================
const navItems = document.querySelectorAll(".nav-item");
const contentSections = document.querySelectorAll(".content-section");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Enlève la classe 'active' de tous les boutons et de toutes les pages
    navItems.forEach((nav) => nav.classList.remove("active"));
    contentSections.forEach((sec) => sec.classList.remove("active"));

    // Ajoute 'active' au bouton cliqué et à la page correspondante
    item.classList.add("active");
    const targetId = item.getAttribute("data-target");
    document.getElementById(targetId).classList.add("active");
  });
});

// ==========================================
// 3. MODULE : PROGRAMMES & SÉRIES
// ==========================================
const formAddSerie = document.getElementById("form-add-serie");
const listSeriesAdmin = document.getElementById("list-series-admin");

if (formAddSerie) {
  formAddSerie.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "renouvellements"), {
        titre: document.getElementById("serie-titre").value,
        saison: document.getElementById("serie-saison").value,
        date: document.getElementById("serie-date").value,
        statut: document.getElementById("serie-statut").value,
        ajouteLe: new Date(),
      });
      alert("Succès ! La série a été ajoutée.");
      formAddSerie.reset();
    } catch (error) {
      alert("Une erreur est survenue.");
    }
  });
}

if (listSeriesAdmin) {
  const qSeries = query(
    collection(db, "renouvellements"),
    orderBy("ajouteLe", "desc"),
  );
  onSnapshot(qSeries, (snapshot) => {
    listSeriesAdmin.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      listSeriesAdmin.innerHTML += `
        <tr>
            <td><strong>${data.titre}</strong></td>
            <td>${data.saison}</td>
            <td><span class="badge badge-${data.statut}">${data.statut}</span></td>
            <td><button class="btn-delete" data-id="${docSnap.id}" data-type="serie"><i class="fas fa-trash"></i></button></td>
        </tr>`;
    });
  });
}

// ==========================================
// 4. MODULE : ESPACE PRESSE (PLAN B)
// ==========================================
const formAddPresse = document.getElementById("form-add-presse");
const checkboxUne = document.getElementById("presse-une");
const uneOptions = document.getElementById("une-options");
const listPresseAdmin = document.getElementById("list-presse-admin");

// Afficher les options "À la Une"
if (checkboxUne) {
  checkboxUne.addEventListener("change", () => {
    uneOptions.style.display = checkboxUne.checked ? "block" : "none";
    document.getElementById("presse-image").required = checkboxUne.checked;
  });
}

if (formAddPresse) {
  formAddPresse.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "communiques"), {
        titre: document.getElementById("presse-titre").value,
        categorie: document.getElementById("presse-categorie").value,
        nom_pdf: document.getElementById("presse-fichier").value,
        a_la_une: checkboxUne.checked,
        badge: document.getElementById("presse-badge").value, // NOUVEAU : On sauvegarde le badge !
        nom_image: document.getElementById("presse-image").value,
        description: document.getElementById("presse-desc").value,
        dateAjout: new Date(),
      });
      alert("Succès ! Le communiqué a été ajouté.");
      formAddPresse.reset();
      uneOptions.style.display = "none";
    } catch (error) {
      alert("Une erreur s'est produite.");
    }
  });
}

if (listPresseAdmin) {
  const qPresse = query(
    collection(db, "communiques"),
    orderBy("dateAjout", "desc"),
  );
  onSnapshot(qPresse, (snapshot) => {
    listPresseAdmin.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const badgeUne = data.a_la_une
        ? '<span class="badge badge-renouvele">Oui</span>'
        : '<span class="badge badge-annule">Non</span>';
      listPresseAdmin.innerHTML += `
                <tr>
                    <td><strong>${data.titre}</strong><br><small style="color:gray;">PDF: ${data.nom_pdf}</small></td>
                    <td><span class="badge badge-nouveau">${data.categorie}</span></td>
                    <td>${badgeUne}</td>
                    <td><button class="btn-delete" data-id="${docSnap.id}" data-type="presse"><i class="fas fa-trash"></i></button></td>
                </tr>`;
    });
  });
}

// ==========================================
// 5. GESTION COMMUNE DES SUPPRESSIONS
// ==========================================
// Comme on a plusieurs tableaux, on gère les clics sur toutes les poubelles ici
document.addEventListener("click", async (e) => {
  // Si on clique sur le bouton poubelle ou l'icône à l'intérieur
  const btn = e.target.closest(".btn-delete");
  if (btn) {
    const id = btn.getAttribute("data-id");
    const type = btn.getAttribute("data-type"); // "serie" ou "presse"
    const collectionName = type === "serie" ? "renouvellements" : "communiques";

    if (confirm("Veux-tu vraiment supprimer cet élément ?")) {
      await deleteDoc(doc(db, collectionName, id));
    }
  }
});
// ==========================================
// 6. SCRIPT DE MIGRATION GLOBAL (LE BON !)
// ==========================================
const btnImportPresse = document.getElementById("btn-import-presse");

if (btnImportPresse) {
  btnImportPresse.addEventListener("click", async () => {
    if (
      confirm(
        "Réimporter les actualités et les documents presse dans les bons dossiers ?",
      )
    ) {
      btnImportPresse.innerHTML =
        "<i class='fas fa-spinner fa-spin'></i> Importation...";
      btnImportPresse.disabled = true;

      try {
        // 1. On remplit l'Accueil (actualites)
        const actusAccueil = [
          {
            titre: "Bilan du 1er trimestre 2026",
            badge: "strategie",
            nom_image: "finance-illustration.jpg",
            nom_pdf: "resultat-t1-2026-groupetf1cp.pdf",
            description:
              "Découvrez les chiffres du 1er trimestre 2026, du groupe TF1 Camping Paradis",
            dateAjout: new Date(),
          },
          {
            titre: "Grilles des programmes 2026 - 2027",
            badge: "programmes",
            nom_image: "873f44e_7572-1ibc6z7.eeqd.avif",
            nom_pdf: "",
            description:
              "Le groupe annoncera sa grille des programmes pour la saison 2026-2027, le 15 mai, lors d'une conférence de presse.",
            dateAjout: new Date(),
          },
          {
            titre: "Renouvellement des programmes",
            badge: "programmes",
            nom_image: "imagesériecommuniqué.avif",
            nom_pdf: "CPK_renouvellement.pdf",
            description:
              "Le groupe TF1 Camping Paradis annonce les renouvellements de ses programmes pour la saison 2026-2027, avec des nouveautés à découvrir.",
            dateAjout: new Date(),
          },
          {
            titre: "Soutien à la création française",
            badge: "rse",
            nom_image: "DIY-clap-de-cinema-1.jpg",
            nom_pdf: "cdp_3mai2026.pdf",
            description:
              "Le groupe renforce ses partenariats avec les producteurs locaux pour mettre en avant nos talents, ainsi que les protégés de l'arrivée de l'intelligence artificielle.",
            dateAjout: new Date(),
          },
        ];
        for (const a of actusAccueil)
          await addDoc(collection(db, "actualites"), a);

        // 2. On remplit la Presse Classique (presse_documents)
        const presseClassique = [
          {
            titre:
              "Résultats du Trimestre 1 2026 du groupe TF1 Camping Paradis",
            categorie: "presse",
            date_texte: "5 mai 2026",
            nom_pdf: "resultat-t1-2026-groupetf1cp.pdf",
            dateAjout: new Date(),
          },
          {
            titre:
              "Le groupe TF1 Camping Paradis renforce son soutien à la création française",
            categorie: "presse",
            date_texte: "3 mai 2026",
            nom_pdf: "cdp_3mai2026.pdf",
            dateAjout: new Date(),
          },
          {
            titre:
              "Résultats Financiers 1er Semestre 2025 : Une croissance record pour le pôle Télévision.",
            categorie: "presse",
            date_texte: "26 Juillet 2025",
            nom_pdf:
              "Communique de presse résulat s1 2025 et nouveau enjeux.pdf",
            dateAjout: new Date(),
          },
        ];
        for (const p of presseClassique)
          await addDoc(collection(db, "presse_documents"), p);

        // 3. On remplit la Presse Kit (presse_documents)
        const presseKit = [
          {
            titre:
              "TF1 Camping Paradis annonce les renouvellements de ses programmes.",
            categorie: "pressekit",
            date_texte: "10 mai 2026",
            nom_pdf: "CPK_renouvellement.pdf",
            dateAjout: new Date(),
          },
          {
            titre: "TF1 Camping Paradis annonce l’arrivé de NCIS : New York",
            categorie: "pressekit",
            date_texte: "15 avril 2026",
            nom_pdf: "CPK_NCISNewyork.pdf",
            dateAjout: new Date(),
          },
        ];
        for (const k of presseKit)
          await addDoc(collection(db, "presse_documents"), k);

        alert(
          "✅ MAGIE RÉUSSIE ! Tous les tiroirs sont remplis correctement !",
        );
        btnImportPresse.style.display = "none";
      } catch (error) {
        console.error(error);
        alert("Erreur lors de l'importation.");
      }
    }
  });
}
