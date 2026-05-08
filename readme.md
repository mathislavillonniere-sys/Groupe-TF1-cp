### Partie 1 : Fondation et Architecture Globale

Description : Mise en place des fondations du site pour garantir une navigation fluide et une maintenance facile.

Modularité du code : Découpage du projet en composants distincts (dossiers /navbar, /footer, /histoire, /chaines) avec leurs propres fichiers HTML, CSS et JS pour éviter les conflits.

Charte Graphique (CSS Variables) : Création d'un thème centralisé (Bleu corporate #00152b, Rouge TF1 #e2001a) appliqué sur toutes les pages pour garantir la cohérence visuelle.

Responsive Design : Intégration systématique de règles @media (max-width: 768px) pour adapter le contenu aux smartphones et tablettes.

### Partie 2 : Le "Hero Carrousel" (Page d'Accueil)

Description : Création d'une vitrine dynamique pour mettre en avant les programmes phares (Star Academy, NCIS, etc.).

Proportions Cinéma : Utilisation de aspect-ratio: 16 / 6 pour un affichage large et immersif sur ordinateur.

Logique JavaScript : Développement d'un slider automatique (toutes les 5 secondes) avec un bouton Lecture/Pause (isPlaying), des flèches de navigation et des indicateurs (dots).

Optimisation Mobile : Réduction de la hauteur (350px), recentrage du texte et masquage des éléments non essentiels (badges "INÉDIT", boutons secondaires) pour ne pas surcharger l'écran du téléphone.

### Partie 3 : Design Premium "Data-Visualisation" (Accueil)

Description : Modernisation de la présentation des chiffres du groupe (Chiffre d'affaires, Audience, Employés).

Effet Glassmorphism : Remplacement des cartes basiques par des blocs en "verre dépoli" via background: rgba(255, 255, 255, 0.08) et backdrop-filter: blur(15px).

Animation au Scroll : Mise en place d'un script IntersectionObserver (animation.js) qui détecte quand l'utilisateur arrive sur la section pour lancer une animation fluide d'incrémentation des compteurs (de 0 à 206 Mds€).

Indicateurs de tendance : Ajout de badges visuels (ex: flèche verte "Croissance solide") pour rassurer les partenaires.

### Partie 4 : Création de la "Newsroom" et Parallaxe (Accueil)

Description : Dynamisation du flux d'actualités et séparation visuelle des sections.

Effet Parallaxe : Intégration d'une citation du PDG sur une image de fond fixe (background-attachment: fixed). Cet effet a été intelligemment désactivé sur mobile (scroll) pour éviter les bugs natifs d'Apple/iOS.

Carrousel d'Actualités : Création d'un slider horizontal en CSS (overflow-x: auto) avec des cartes d'articles interactives (ombres douces au survol, badges de catégories "Stratégie", "RSE").

Voici la suite de ton README, rédigée exactement avec le même modèle que tu as fourni pour les parties précédentes :

Partie 4 : Aperçu des Pôles d'Activités (Accueil)
Description : Intégration d'une nouvelle section de prévisualisation interactive permettant d'accéder rapidement aux différents secteurs stratégiques du groupe depuis la page d'accueil.

Grille Responsive : Mise en place d'un affichage adaptatif via display: grid (7 colonnes sur grand écran, 4 sur tablette, et 2 sur mobile) pour garantir une lisibilité parfaite sur tous les supports.

Design & Animations Premium : Création de cartes avec un effet de rebond au survol (utilisation de la transition cubic-bezier), ajout d'ombres portées dynamiques et intégration d'un bouton central modernisé au style "pilule" (border-radius: 50px).

Mise à jour Stratégique : Remplacement de l'encart dédié au pôle "Immobilier" par le pôle "International" (avec son icône globe) directement sur la grille d'accueil pour refléter la nouvelle organisation.

### Partie 5 : L'Espace Professionnel et la Gestion des Grilles (Page Pro)

Description : Traitement des données externes pour afficher les plannings de diffusion.

Correction de l'arborescence HTML : Réorganisation physique des blocs dans le HTML (Prime Time, Matin, Après-midi, Nuit) pour forcer un affichage chronologique sans alourdir le JavaScript.

Lecteur CSV Customisé : Développement d'une fonction parseCSVLine capable de lire un fichier Excel transformé en CSV, tout en ignorant intelligemment les virgules cachées à l'intérieur des titres d'émissions.

### Partie 6 : Le Moteur du "Direct" (Page Chaînes)

Description : Développement de l'algorithme capable de dire quelle émission passe actuellement à la télévision en lisant les grilles Excel.

Décodage ISO-8859-1 : Implémentation d'un TextDecoder sur le fetch() pour traduire correctement les accents français des fichiers Excel (corrigeant le bug des losanges "Les Gens D'À COTÉ").

Logique de la Journée TV : Le script a été programmé pour comprendre que la "journée" de télévision commence à 6h00. Un passage de 23h à 01h du matin incrémente automatiquement la date au lendemain.

Barre de progression : Calcul mathématique en temps réel du pourcentage d'avancement de l'émission pour remplir la jauge rouge du "Live".

### Partie 7 : Le Design des Chaînes et le "Saut de Mise en Page"

Description : Habillage de l'espace de streaming et correction des interactions utilisateur.

Système d'onglets (Tabs) : Création d'un script JS cachant/affichant les blocs de chaînes (TF1, M6, TFX) selon le bouton cliqué.

Correction du Saut (Hover) : Fixation des dimensions des boutons de chaînes (280x60px) avec des éléments en position: absolute. Cela a permis de créer un fondu élégant entre le texte gris et le logo de la chaîne au survol, sans déplacer les autres éléments de la page.

### Partie 8 : Page Histoire et "Timeline" (Corporate)

Description : Construction de la page institutionnelle retraçant l'évolution du groupe.

Frise chronologique : Création d'une ligne verticale centrale en CSS avec une alternance gauche/droite (nth-child(odd/even)) pour disposer les dates clés du groupe.

Animation d'apparition : Ajout d'un observateur JS qui fait glisser (translateY) et apparaître (opacity: 1) chaque événement historique au fur et à mesure que l'utilisateur descend sur la page.

### Partie 9 : Stratégie Visuelle et Optimisation des Images (Les "Hero Banners")

Description : Standardisation des en-têtes de pages secondaires (Chaînes, Pro, Histoire).

Le Voile Corporate (Overlay) : Création d'un système où chaque page a une grande photo de fond recouverte d'un voile bleu translucide (rgba(0, 21, 43, 0.85)). Cela assure une lisibilité parfaite des titres blancs.

Charte de Performance : Définition d'une règle stricte pour l'utilisation des images : format 16:9 (1920x1080), privilégier le format léger WebP (ou JPEG), et bannir le PNG pour les photos afin de garantir un temps de chargement ultra-rapide du site.
