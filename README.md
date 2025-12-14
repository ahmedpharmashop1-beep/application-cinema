# 🎬 Cinéma Moderne

Une application web moderne et élégante pour découvrir et explorer une collection de films. Interface intuitive avec recherche en temps réel et filtrage par genre.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Spécification technique](#spécification-technique)
- [Améliorations futures](#améliorations-futures)

## 🎯 Aperçu

**Cinéma Moderne** est une application web responsive qui permet aux utilisateurs de :
- Parcourir une collection de films
- Rechercher des films par titre, description ou genre
- Filtrer les films par catégorie (Action, Drame, Comédie, etc.)
- Visualiser les détails de chaque film (affiche, année, note, description, genres)

L'application utilise un design moderne avec des effets de glassmorphism, des animations fluides et une interface utilisateur intuitive.

## ✨ Fonctionnalités

### 🔍 Recherche
- **Recherche en temps réel** : Les résultats se mettent à jour automatiquement pendant la saisie
- **Recherche multi-critères** : Recherche dans les titres, descriptions et genres
- **Recherche par touche Entrée** : Support du clavier pour une navigation rapide

### 🎭 Filtrage
- **Filtres par genre** : Action, Drame, Comédie, Science-Fiction, Aventure
- **Filtre "Tous les films"** : Affiche l'ensemble de la collection
- **Combinaison recherche + filtre** : Les deux fonctionnalités fonctionnent simultanément

### 🎨 Interface utilisateur
- **Design moderne** : Effets glassmorphism et gradients subtils
- **Animations fluides** : Transitions CSS avec cubic-bezier
- **Responsive design** : Adapté à tous les écrans (mobile, tablette, desktop)
- **Accessibilité** : Support des attributs ARIA et navigation au clavier

### 📱 Cartes de films
Chaque carte affiche :
- Affiche du film avec effet zoom au survol
- Titre du film
- Année de sortie
- Note sur 5 étoiles
- Description (tronquée à 3 lignes)
- Badges de genres

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique avec balises modernes
- **CSS3** : 
  - Variables CSS pour la maintenabilité
  - Flexbox et Grid Layout
  - Animations et transitions
  - Media queries pour le responsive
- **JavaScript (ES6+)** :
  - Manipulation du DOM
  - Filtrage et recherche dynamiques
  - Gestion d'état simplifiée
- **Font Awesome 6.4.0** : Icônes vectorielles

## 🚀 Installation

### Prérequis
Aucun prérequis nécessaire ! L'application fonctionne directement dans le navigateur.

### Étapes d'installation

1. **Cloner ou télécharger le projet**
   ```bash
   git clone <url-du-repo>
   cd "application cinema"
   ```

2. **Ouvrir l'application**
   - Ouvrir le fichier `index.html` dans votre navigateur web
   - Ou utiliser un serveur local :
     ```bash
     # Avec Python
     python -m http.server 8000
     
     # Avec Node.js (http-server)
     npx http-server
     
     # Avec PHP
     php -S localhost:8000
     ```

3. **Accéder à l'application**
   - Ouvrir `http://localhost:8000` dans votre navigateur

## 📖 Utilisation

### Recherche de films
1. Saisir un terme dans la barre de recherche (titre, genre, mot-clé)
2. Les résultats se mettent à jour automatiquement
3. Appuyer sur **Entrée** ou cliquer sur le bouton "Rechercher"

### Filtrage par genre
1. Cliquer sur un bouton de filtre (Action, Drame, Comédie, etc.)
2. La liste se met à jour pour afficher uniquement les films du genre sélectionné
3. Cliquer sur "Tous les films" pour réinitialiser

### Combinaison recherche + filtre
- Utiliser simultanément la recherche et les filtres pour affiner les résultats
- Exemple : Filtrer par "Action" et rechercher "Wick" pour trouver "John Wick 4"

## 📁 Structure du projet

```
application cinema/
│
├── index.html          # Structure HTML principale
├── style.css           # Styles CSS avec variables et animations
├── app.js              # Logique JavaScript de l'application
├── data.js             # Base de données des films (JSON)
└── README.md           # Documentation du projet
```

### Description des fichiers

- **index.html** : Structure sémantique avec header, navigation, section principale
- **style.css** : 
  - Variables CSS pour les couleurs et espacements
  - Styles pour les cartes, boutons, recherche
  - Media queries pour le responsive
- **app.js** : 
  - Gestion des événements (recherche, filtres)
  - Fonctions de filtrage et d'affichage
  - Création dynamique des cartes de films
- **data.js** : Tableau d'objets contenant les informations des films

## 📐 Spécification technique

### Architecture

L'application suit une architecture simple et modulaire :

```
┌─────────────────┐
│   index.html    │  ← Structure HTML
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│data.js│ │app.js │  ← Logique et données
└───┬───┘ └───┬───┘
    │         │
    └────┬────┘
         │
    ┌────▼────┐
    │style.css│  ← Présentation
    └─────────┘
```

### Modèle de données

Chaque film est représenté par un objet JavaScript :

```javascript
{
    id: Number,              // Identifiant unique
    title: String,           // Titre du film
    year: Number,            // Année de sortie
    rating: Number,          // Note sur 5
    description: String,     // Synopsis
    genres: Array<String>,   // Liste des genres
    poster: String           // URL de l'affiche
}
```

### Fonctions principales

#### `displayMovies(moviesArray)`
- Affiche la liste des films dans la grille
- Gère l'affichage du message "Aucun résultat"

#### `createMovieCard(movie)`
- Génère le HTML d'une carte de film
- Retourne une chaîne de caractères HTML

#### `filterMovies()`
- Filtre les films selon les critères de recherche et de genre
- Combine les filtres de manière logique (ET)

#### `setupEvents()`
- Configure tous les écouteurs d'événements
- Gère la recherche et les filtres

### Variables CSS principales

```css
--bg-primary: #0a0a15          /* Fond principal */
--bg-secondary: #1a1a2e        /* Fond secondaire */
--accent: #e50914              /* Couleur d'accent (rouge) */
--text-primary: #ffffff       /* Texte principal */
--radius: 16px                 /* Rayon des bordures */
--transition: cubic-bezier(...) /* Courbe d'animation */
```

### Responsive Breakpoints

- **Desktop** : > 768px (grille 4 colonnes)
- **Tablette** : 576px - 768px (grille 2-3 colonnes)
- **Mobile** : < 576px (grille 1 colonne)

## 🔮 Améliorations futures

### Fonctionnalités proposées

- [ ] **Tri des films** : Par année, note, titre (croissant/décroissant)
- [ ] **Vue détaillée** : Modal ou page dédiée avec plus d'informations
- [ ] **Favoris** : Système de sauvegarde locale (localStorage)
- [ ] **Pagination** : Pour gérer de grandes collections
- [ ] **API externe** : Intégration avec TMDB ou OMDb pour des données réelles
- [ ] **Mode sombre/clair** : Toggle entre thèmes
- [ ] **Filtres avancés** : Par année, note minimale, etc.
- [ ] **Recherche vocale** : Utilisation de l'API Web Speech
- [ ] **Partage social** : Boutons de partage pour les films
- [ ] **Export** : Télécharger la liste en CSV/JSON

### Optimisations techniques

- [ ] **Lazy loading** : Chargement différé des images
- [ ] **Service Worker** : Mise en cache pour mode hors ligne
- [ ] **Compression** : Minification des fichiers CSS/JS
- [ ] **Tests** : Ajout de tests unitaires (Jest)
- [ ] **TypeScript** : Migration vers TypeScript pour la robustesse

## 👨‍💻 Développement

### Code style

- **JavaScript** : ES6+, fonctions fléchées, const/let
- **CSS** : BEM-like naming, variables CSS
- **HTML** : Sémantique, accessibilité (ARIA)

### Performance

- **Temps de chargement** : < 1s sur connexion moyenne
- **Taille totale** : ~15KB (sans images)
- **Compatibilité** : Navigateurs modernes (Chrome, Firefox, Safari, Edge)

## 📄 Licence

Ce projet est libre d'utilisation pour des fins éducatives et personnelles.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Optimiser le code

---

**Développé avec ❤️ pour les amateurs de cinéma**

