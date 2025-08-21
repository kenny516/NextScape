# NextScape - Agents Development Guidelines

NextScape est une application Next.js moderne avec authentification, dashboard et interface d'administration. Ce guide contient les meilleures pratiques pour travailler efficacement avec des agents sur ce projet.

## 📋 Architecture du Projet

### Structure Principal

- **App Router (Next.js 15+)** avec TypeScript et Turbopack
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : Better Auth avec adaptateur Prisma
- **UI/UX** : Tailwind CSS + shadcn/ui + Radix UI
- **État global** : Zustand
- **Validation** : Zod + ZSA (Zod Server Actions)
- **Gestion des formulaires** : React Hook Form
- **Graphiques** : Recharts

### Technologies Clés

- Next.js 15.2.2 avec App Router
- React 19+ avec TypeScript 5.8+
- Prisma 6.5+ avec PostgreSQL
- Better Auth pour l'authentification sociale et email/password
- shadcn/ui pour les composants UI

## 🚀 Environnement de Développement

### Commandes Principales

```bash
# Démarrer le serveur de développement (avec Turbopack)
pnpm dev

# Installation des dépendances
pnpm install

# Base de données
pnpm prisma generate    # Générer le client Prisma
pnpm prisma migrate dev # Appliquer les migrations
pnpm prisma studio      # Interface graphique DB

# Linting et qualité du code
pnpm lint              # ESLint + TypeScript
pnpm build             # Build de production (éviter en développement)
```

### Docker Development

```bash
# Démarrer l'environnement complet (app + PostgreSQL)
docker compose up --watch

# Base de données seule
docker compose up db
```

## 🛠️ Bonnes Pratiques de Développement

### 1. Serveur de Développement

- **TOUJOURS utiliser `pnpm dev`** pour le développement (Turbopack activé)
- **NE JAMAIS lancer `pnpm build`** pendant une session agent
- Redémarrer le serveur après modification des dépendances
- Utiliser `pnpm dev --port 3001` si le port 3000 est occupé

### 2. Base de Données (Prisma)

```bash
# Après modification du schema.prisma
pnpm prisma migrate dev --name "description_du_changement"
pnpm prisma generate

# Reset de la DB (développement uniquement)
pnpm prisma migrate reset

# Seeding (si configuré)
pnpm prisma db seed
```

### 3. Authentification (Better Auth)

- Configuration dans `lib/auth.ts`
- Providers supportés : Email/Password, GitHub, Google, Facebook
- Middleware dans `middleware.ts` pour les routes protégées
- Session management avec `lib/auth-client.ts` et `lib/auth-session.ts`

### 4. Structure des Composants

```text
components/
├── ui/           # Composants shadcn/ui de base
├── custom/       # Composants spécifiques au projet
├── form/         # Composants de formulaires
├── back-office/  # Composants admin/dashboard
└── theme/        # Gestion du thème
```

### 5. Routes et Navigation

```text
app/
├── (auth)/          # Routes d'authentification
├── content/
│   ├── front-office/  # Interface utilisateur
│   └── back-office/   # Dashboard admin
└── api/             # API Routes
```

## 📝 Conventions de Code

### TypeScript

- **Obligatoire** pour tous les nouveaux fichiers (`.tsx`/`.ts`)
- Types définis dans `types/index.ts`
- Utiliser `zod` pour la validation des schémas

### Composants React

- Composants fonctionnels avec hooks
- Props typées avec TypeScript
- Utilisation de `forwardRef` pour les composants UI
- Export nommé + export default quand approprié

### Styling

- **Tailwind CSS** pour le styling principal
- **CSS Variables** pour les thèmes (voir `app/globals.css`)
- Classes utilitaires avec `clsx` et `tailwind-merge`
- Composants avec `class-variance-authority` pour les variants

### État et Data Fetching

- **Zustand** pour l'état global (`stores/`)
- **ZSA (Zod Server Actions)** pour les actions serveur
- **React Hook Form** + **Zod** pour les formulaires
- Custom hooks dans `hooks/`

## 🧪 Tests et Qualité

### Linting et Formatage

```bash
# Vérification du code
pnpm lint

# Vérification TypeScript
pnpm tsc --noEmit

# Formatting (si configuré)
pnpm format
```

### Avant Commit

1. `pnpm lint` - Pas d'erreurs ESLint/TypeScript
2. `pnpm build` - Build réussi (en local uniquement)
3. Tester les nouvelles fonctionnalités
4. Vérifier les migrations Prisma si applicable

## 🔧 Débuggage et Diagnostic

### Problèmes Courants

```bash
# Erreurs de type Prisma
pnpm prisma generate

# Erreurs de cache Next.js
Remove-Item -Recurse -Force .next; pnpm dev

# Problèmes de dépendances
Remove-Item -Recurse -Force node_modules, pnpm-lock.yaml; pnpm install

# Reset complet de la base de données
pnpm prisma migrate reset
```

### Variables d'Environnement Requises

```env
# Base de données
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..." # Pour Prisma Migrate

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-secret"
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

## 📦 Gestion des Dépendances

### Installation de Nouvelles Dépendances

```bash
# Runtime dependencies
pnpm add package-name

# Dev dependencies
pnpm add -D package-name

# Mise à jour des dépendances
pnpm update
```

### Dépendances Critiques

- Toujours vérifier la compatibilité avec Next.js 15+
- Respecter les versions de React 19+
- Tester après mise à jour de Prisma
- Redémarrer le serveur après ajout de dépendances

## 🚨 Points d'Attention

### Éviter Absolument

- `pnpm build` pendant le développement
- Modifications directes de la base de données sans migration
- Bypass du middleware d'authentification
- Modifications des fichiers de configuration sans test

### Workflows Recommandés

1. **Nouvelle fonctionnalité** : Branch → Développement → Test → PR
2. **Bug fix** : Reproduire → Identifier → Corriger → Tester
3. **Modification DB** : Schema → Migration → Generate → Test
4. **Nouveaux composants** : Types → Component → Storybook (si applicable) → Integration

---

**Rappel** : Ce projet utilise PNPM comme gestionnaire de packages et Next.js 15 avec App Router. Toujours privilégier les Server Components quand possible et utiliser les Client Components uniquement quand nécessaire (interactivité, hooks, etc.).
