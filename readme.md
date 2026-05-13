# 🌴 Groupe TF1 Camping Paradis - Documentation du Projet

> **Bienvenue sur la documentation officielle du projet.** > Ce document retrace l'historique de développement, les choix techniques et l'architecture globale du site web interactif du groupe TF1 Camping Paradis.

---

## 🏗️ PHASE 1 : Architecture & Design Front-End

### 📌 Partie 1 : Fondation et Architecture Globale

> _Mise en place des fondations du site pour garantir une navigation fluide et une maintenance facile._

- 🧩 **Modularité du code :** Découpage du projet en composants distincts (dossiers `/navbar`, `/footer`, `/histoire`, `/chaines`) avec leurs propres fichiers HTML, CSS et JS pour éviter les conflits.
- 🎨 **Charte Graphique (CSS Variables) :** Création d'un thème centralisé (Bleu corporate `#00152b`, Rouge TF1 `#e2001a`) appliqué sur toutes les pages pour garantir la cohérence visuelle.
- 📱 **Responsive Design :** Intégration systématique de règles `@media (max-width: 768px)` pour adapter le contenu aux smartphones et tablettes.

### 🎠 Partie 2 : Le "Hero Carrousel" (Page d'Accueil)

> _Création d'une vitrine dynamique pour mettre en avant les programmes phares (Star Academy, NCIS, etc.)._

- 🎬 **Proportions Cinéma :** Utilisation de `aspect-ratio: 16 / 6` pour un affichage large et immersif sur ordinateur.
- ⚙️ **Logique JavaScript :** Développement d'un slider automatique (toutes les 5 secondes) avec un bouton Lecture/Pause, des flèches de navigation et des indicateurs (dots).
- 📱 **Optimisation Mobile :** Réduction de la hauteur (350px), recentrage du texte et masquage des éléments non essentiels (badges "INÉDIT") pour ne pas surcharger l'écran.

### 📊 Partie 3 : Design Premium "Data-Visualisation" (Accueil)

> _Modernisation de la présentation des chiffres du groupe (Chiffre d'affaires, Audience, Employés)._

- 🪞 **Effet Glassmorphism :** Remplacement des cartes basiques par des blocs en "verre dépoli" via `background: rgba(255, 255, 255, 0.08)` et `backdrop-filter: blur(15px)`.
- ✨ **Animation au Scroll :** Mise en place d'un script `IntersectionObserver` qui détecte quand l'utilisateur arrive sur la section pour lancer une animation fluide d'incrémentation des compteurs.
- 📈 **Indicateurs de tendance :** Ajout de badges visuels (ex: flèche verte "Croissance solide") pour rassurer les partenaires.

### 📰 Partie 4 : Création de la "Newsroom" et Aperçu des Pôles

> _Dynamisation du flux d'actualités et intégration d'une prévisualisation interactive des secteurs stratégiques._

- 🌠 **Effet Parallaxe :** Intégration d'une citation du PDG sur une image de fond fixe (`background-attachment: fixed`), désactivée intelligemment sur mobile pour éviter les bugs natifs d'iOS.
- 🎠 **Carrousel d'Actualités :** Création d'un slider horizontal en CSS (`overflow-x: auto`) avec des cartes interactives (ombres douces, badges de catégories).
- 🗂️ **Grille Responsive des Pôles :** Affichage adaptatif via `display: grid` garantissant une lisibilité parfaite (7 colonnes sur bureau, 2 sur mobile) avec des cartes à effet de rebond (`cubic-bezier`).

---

## 📺 PHASE 2 : Espace Pro & Moteur de Grilles TV

### 💼 Partie 5 : L'Espace Professionnel et la Gestion des Grilles

> _Traitement des données externes pour afficher les plannings de diffusion._

- 📂 **Correction de l'arborescence HTML :** Réorganisation physique des blocs (Prime Time, Matin, Après-midi, Nuit) pour forcer un affichage chronologique sans alourdir le JS.
- 📄 **Lecteur CSV Customisé :** Développement d'une fonction `parseCSVLine` capable de lire un fichier Excel transformé en CSV, tout en ignorant intelligemment les virgules cachées dans les titres.

### 🔴 Partie 6 : Le Moteur du "Direct" (Page Chaînes)

> _Développement de l'algorithme capable de dire quelle émission passe actuellement à la télévision en lisant les grilles Excel._

- 🌍 **Décodage ISO-8859-1 :** Implémentation d'un `TextDecoder` sur le `fetch()` pour traduire correctement les accents français des fichiers Excel.
- 🕒 **Logique de la Journée TV :** Le script comprend que la "journée" commence à 6h00. Un passage de 23h à 01h du matin incrémente automatiquement la date au lendemain.
- ⏳ **Barre de progression :** Calcul mathématique en temps réel du pourcentage d'avancement de l'émission pour remplir la jauge rouge du "Live".

### 🖌️ Partie 7 : Le Design des Chaînes et "Saut de Mise en Page"

> _Habillage de l'espace de streaming et correction des interactions utilisateur._

- 📑 **Système d'onglets (Tabs) :** Script JS cachant/affichant les blocs de chaînes selon la sélection.
- 🎯 **Correction du Saut (Hover) :** Fixation des dimensions des boutons (280x60px) en `position: absolute` pour créer un fondu élégant entre le texte et le logo au survol sans déplacer la page.

---

## 🏛️ PHASE 3 : Pages Institutionnelles & Charte

### 📜 Partie 8 : Page Histoire et "Timeline"

> _Construction de la page institutionnelle retraçant l'évolution du groupe._

- ⏳ **Frise chronologique :** Création d'une ligne verticale centrale en CSS avec alternance gauche/droite (`nth-child(odd/even)`) pour disposer les dates clés.
- 🎬 **Animation d'apparition :** Ajout d'un observateur JS qui fait glisser (`translateY`) et apparaître chaque événement historique au fil du scroll.

### 🖼️ Partie 9 : Stratégie Visuelle et Optimisation

> _Standardisation des en-têtes de pages secondaires._

- 🌫️ **Le Voile Corporate (Overlay) :** Grande photo de fond recouverte d'un voile bleu translucide (`rgba(0, 21, 43, 0.85)`) assurant une lisibilité parfaite des titres blancs.
- ⚡ **Charte de Performance :** Règle stricte pour les images : format 16:9, privilégier le WebP/JPEG, bannir le PNG pour les photos afin de garantir un chargement ultra-rapide.

---

## 🚀 PHASE 4 : Back-End & CMS (Système d'Administration)

### ⚙️ Partie 10 : Système de Gestion de Contenu (Back-Office & Firebase)

> _Création d'un espace administrateur sécurisé pour gérer les publications de manière autonome._

- 🗄️ **Base de Données Firestore :** Architecture centralisée via Firebase (`communiques`) stockant les actualités, communiqués et kits médias.
- 🔒 **Authentification Sécurisée :** Intégration de Firebase Auth pour protéger l'accès (`admin.html`) par identifiants professionnels.
- 🎛️ **Interface d'Administration :** Tableau de bord ergonomique avec navigation par onglets pour gérer distinctement les séries et l'espace presse.

### 🔄 Partie 11 : Dynamisation de l'Accueil et des Pages Presse

> _Connexion des pages publiques à la base de données pour un affichage en temps réel._

- 🧠 **Tri Intelligent (Front-End) :** Scripts (`actualites.js`, `presse-dynamique.js`) qui interrogent et filtrent le contenu selon la `catégorie` et le statut `a_la_une`.
- 🔢 **Système de Pondération (Ordre) :** Champ numérique permettant de classer et de contrôler précisément la position des cartes sur l'accueil (`sort()`).
- 📂 **Gestion Logique des Fichiers :** Une actualité sans PDF s'affiche uniquement sur l'accueil (info visuelle), tandis qu'un communiqué complet intègre les listes téléchargeables.

### ⏱️ Partie 12 : Édition Avancée et Programmation (Embargo)

> _Amélioration de l'outil d'administration avec des fonctionnalités journalistiques._

- ✏️ **Mode Édition Dynamique :** Fonctionnalité de modification (icône crayon) pour pré-remplir et mettre à jour un communiqué existant (`updateDoc`).
- 📅 **Programmation de Publication :** Champ `datetime-local` permettant de programmer une sortie. Le filtre temporel Front-End masque l'article jusqu'à l'heure exacte.
- 🛡️ **Sécurité Anti-Crash :** Renforcement du JS avec des vérifications approfondies (`typeof dateAjout.toDate`) pour empêcher les erreurs lors de la lecture d'anciennes données.

### 📱 Partie 13 : Interface Administrateur Responsive (Mobile-First)

> _Adaptation complète du tableau de bord pour la gestion sur smartphone._

- 👆 **Navigation Tactile (App-Like) :** Transformation de la barre latérale en un menu d'en-tête horizontal avec défilement fluide (`-webkit-overflow-scrolling: touch`).
- 🧱 **Réorganisation des Éléments :** Utilisation de `flex-direction: column` pour empiler proprement les formulaires et ajustement des tableaux pour empêcher le débordement.
