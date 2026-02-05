# 🎮 Millionaire Game

"Who Wants to Be a Millionaire?" game built with Next.js 16, React 19, TypeScript, and Zod validation.

## 🚀 Features

- ✅ **TypeScript** - Full type safety
- ✅ **Runtime Validation** - Zod schemas for config and data
- ✅ **Error Boundaries** - Graceful error handling
- ✅ **Feature-Sliced Design** - Clean architecture
- ✅ **Git Hooks** - Automatic code quality checks
- ✅ **404 Page** - Custom not found page
- ✅ **Responsive Design** - Mobile and desktop support

## 📋 Prerequisites

- Node.js 18+ or 20+
- Yarn 1.x or newer

## 🛠️ Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Run development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the game.

### 3. Build for production

```bash
yarn build
yarn start
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Fix ESLint errors |
| `yarn format` | Format code with Prettier |
| `yarn test` | Run all tests (lint + type-check) |
| `yarn type-check` | Check TypeScript types |

## 🪝 Git Hooks

This project uses **Husky** and **lint-staged** for automatic code quality checks:

### Pre-commit Hook
Runs on `git commit`:
- ✅ ESLint on staged files
- ✅ Prettier formatting
- ✅ Auto-fix issues when possible

### Pre-push Hook
Runs on `git push`:
- ✅ Full ESLint check
- ✅ TypeScript type checking
- ✅ Ensures code quality before pushing

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (home)/            # Home page
│   ├── (game-flow)/       # Game and result pages
│   ├── layout.tsx         # Root layout
│   └── not-found.tsx      # 404 page
├── features/              # Feature modules
│   ├── game/              # Game logic and components
│   │   ├── components/    # Game UI components
│   │   ├── config/        # Game configuration
│   │   ├── hooks/         # Game hooks
│   │   ├── lib/           # Utility functions
│   │   ├── schemas/       # Zod validation schemas
│   │   └── logic.ts       # Pure business logic
│   └── result/            # Result page feature
├── shared/                # Shared code
│   ├── ui/                # Reusable UI components
│   ├── lib/               # Utility functions
│   └── types/             # Shared types
└── styles/                # Global styles
```

## 🎯 Architecture Highlights

### Runtime Validation with Zod
- ✅ Game config validation
- ✅ Cookie data validation
- ✅ Detailed error messages

### Error Handling
- ✅ Error Boundaries for React errors
- ✅ ErrorMessage component for user-facing errors
- ✅ LoadingSpinner for async states
- ✅ Graceful fallbacks everywhere

### Code Quality
- ✅ ESLint + Prettier
- ✅ TypeScript strict mode
- ✅ Git hooks for automatic checks
- ✅ Feature-Sliced Design architecture

## 🔧 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript 5
- **Validation:** Zod
- **Styling:** CSS Modules
- **Code Quality:** ESLint, Prettier
- **Git Hooks:** Husky, lint-staged

## 📦 Configuration Files

| File | Purpose |
|------|---------|
| `eslint.config.mjs` | ESLint rules |
| `.prettierrc.json` | Prettier formatting |
| `.lintstagedrc.json` | lint-staged config |
| `tsconfig.json` | TypeScript config |
| `.husky/` | Git hooks |

## 🤝 Contributing

1. Make your changes
2. Run `yarn test` to ensure quality
3. Commit (hooks will run automatically)
4. Push (tests will run automatically)

## 📄 License

This project is for educational purposes.
