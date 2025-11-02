# FDM Hockey - Générateur de Feuilles de Match

Application web pour la création et la gestion de feuilles de match de hockey sur glace. Développée avec React, TypeScript et Vite.

## 🏒 Fonctionnalités

- **Formulaire de saisie** : Création rapide de feuilles de match avec saisie des informations essentielles
  - Date et heure du match
  - Lieu
  - Sexe
  - Compétition
  - Niveau
- **Prévisualisation PDF** : Visualisation en temps réel du PDF généré
- **Interface moderne** : Design responsive avec Ant Design

## 🚀 Technologies

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **Ant Design** - Composants UI
- **React PDF** - Affichage des PDF
- **ESLint** - Linting du code
- **Prettier** - Formatage du code
- **Husky** - Git hooks
- **GitHub Actions** - CI/CD

## 📋 Prérequis

- Node.js 20 ou supérieur
- npm ou yarn

## 🔧 Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/hodess/fdm_hockey_sur_glace.git
cd fdm_hockey_sur_glace
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer le serveur de développement :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📜 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run format` - Formate le code avec Prettier
- `npm run deploy` - Déploie sur GitHub Pages (déploie automatiquement via CI/CD)

## 🌐 Déploiement

Le site est automatiquement déployé sur GitHub Pages après chaque push sur la branche `main`.

**URL du site** : https://hodess.github.io/fdm_hockey_sur_glace/

### Déploiement manuel

Si vous souhaitez déployer manuellement :

```bash
npm run deploy
```

## 🔍 Qualité du code

Le projet utilise plusieurs outils pour maintenir la qualité du code :

- **ESLint** : Détection des erreurs et problèmes de style
- **Prettier** : Formatage automatique du code
- **Husky** : Git hooks pour vérifier le code avant chaque commit
- **TypeScript** : Typage statique pour éviter les erreurs

### Pre-commit hooks

Avant chaque commit, le code est automatiquement :

- Linté et corrigé si possible
- Formaté avec Prettier

Si des erreurs persistent, le commit sera bloqué.

#### Configuration du pre-commit

Le projet utilise **Husky** et **lint-staged** pour vérifier le code avant chaque commit.

**Installation automatique :**

Lorsque vous installez les dépendances avec `npm install`, le script `prepare` s'exécute automatiquement et configure Husky :

```bash
npm install
```

Cela crée automatiquement le hook Git pre-commit dans `.husky/pre-commit`.

**Vérification manuelle :**

Si vous clonez le projet et que les hooks ne sont pas configurés, vous pouvez les réinstaller :

```bash
npm run prepare
```

Cela initialise Husky et configure les hooks Git.

**Fonctionnement :**

Le hook pre-commit exécute `lint-staged` qui :

1. **Fichiers TypeScript/JavaScript** (`*.{ts,tsx,js,jsx}`) :
   - Corrige automatiquement les erreurs ESLint avec `eslint --fix`
   - Vérifie à nouveau avec `eslint` (bloque le commit si des erreurs persistent)
   - Formate le code avec Prettier

2. **Fichiers de configuration** (`*.{json,css,md}`) :
   - Formate le code avec Prettier

**Désactiver temporairement :**

Si vous devez désactiver les hooks pour un commit (non recommandé) :

```bash
git commit --no-verify
```

⚠️ **Attention** : N'utilisez cette option qu'en cas de besoin réel, car cela contourne les vérifications de qualité du code.

## 🤖 CI/CD

Le projet utilise GitHub Actions pour automatiser :

### CI (Continuous Integration)

- Vérification du linting sur chaque Pull Request
- Build de l'application
- Publication d'artefacts pour prévisualisation

### CD (Continuous Deployment)

- Déploiement automatique sur GitHub Pages après merge sur `main`
- Déploiement uniquement si la CI passe avec succès

## 📁 Structure du projet

```
fdm_hockey/
├── .github/
│   └── workflows/          # Workflows GitHub Actions
├── public/                 # Fichiers statiques
├── src/
│   ├── components/         # Composants React
│   ├── lib/                # Utilitaires
│   ├── modal/              # Modales
│   ├── pages/              # Pages
│   ├── types/              # Types TypeScript
│   └── main.tsx            # Point d'entrée
├── .husky/                 # Git hooks
├── eslint.config.js        # Configuration ESLint
└── vite.config.ts          # Configuration Vite
```

## 🔐 Configuration Git

Pour que les workflows fonctionnent correctement, assurez-vous que :

- Les permissions `contents: write` et `pages: write` sont configurées
- Le token `GITHUB_TOKEN` est disponible (automatique dans GitHub Actions)

## 📝 Contribution

1. Créer une branche depuis `main`
2. Faire vos modifications
3. Créer une Pull Request
4. La CI vérifiera automatiquement votre code
5. Une fois la PR approuvée et mergée, la CD déploiera automatiquement

## 📄 Licence

Ce projet est privé.

## 👤 Auteur

Développé pour la gestion de feuilles de match de hockey sur glace.
