# Polaris

A modern web application built with **Next.js 16**, using TypeScript and a robust tooling ecosystem to ensure code quality, performance, and scalability.

---

## 🚀 Getting Started

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000/) in your browser.

This project uses the app/ directory (App Router). You can start editing here:`   app/page.tsx   `

## 🧱 Tech Stack & Tooling

### Core

- **Next.js 16** — React framework with SSR, App Router, and built-in optimizations
- **React 19** — Modern reactive UI library
- **TypeScript** — Static typing for improved reliability and maintainability

### 🎨 UI & Design System

- **Douro UI (@metyis-porto/douro-ui-react)**
  - Reusable design system
  - Consistent and accessible components

- **Emotion (@emotion/react, @emotion/styled)**
  - Flexible CSS-in-JS styling solution

### 🌍 Internationalization

- **next-intl**
  - Translation management
  - Multi-language support
  - Locale-based routing

### 🔄 Data Fetching & State

- **@tanstack/react-query**
  - Async state management
  - Smart caching
  - Built-in DevTools

### Unit & Component Testing

```bash
pnpm run test
# or
pnpm run test:coverage
```

- **Vitest**
  - Fast test runner powered by Vite

- **Testing Library**
  - Focused on user-centric testing

- **happy-dom**
  - Lightweight DOM environment for tests

### End-to-End Testing (E2E)

```bash
pnpm run test:e2e
# or
pnpm run test:e2e:headed
# or
pnpm run test:e2e:debug
```

- **Playwright**
  - Real browser testing
  - Multi-browser support

### ESLint

```bash
pnpm lint
# or
pnpm lint:fix
```

- Enforces best practices for:
  - React
  - TypeScript
  - Import organization

- Based on eslint-config-next

### Stylelint

```bash
pnpm style
# or
pnpm style:fix
```

- Lints styles (including CSS-in-JS)

### Prettier

```bash
pnpm prettier
```

- Automatic code formatting

### Commitlint + Husky

```bash
pnpm prepare
```

- Enforces **Conventional Commits**
- Git hooks powered by **Husky**

### Lint Staged

- Runs automatically on staged files:
  - ESLint
  - Stylelint
  - Prettier

- Ensures clean commits

## ⚙️ Requirements

- Node.js **\>= 22**
- pnpm **\>= 10**

## 📄 License

This project is licensed under the MIT License.

## Learn More

To learn more about the teck stack used in the project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [TypeScriptt Documentation](https://www.typescriptlang.org/docs/) - TypeScript static typing and advanced type features.
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) - caching and reusing our APIs response.
- [Emotion.js](https://emotion.sh/docs/introduction) - styling with JS.
- [NextIntl](https://next-intl.dev/docs/getting-started/app-router) - Internationalization (i18n) for Next.js apps, including locale routing and message formatting.
- [Vitest](https://vitest.dev/) - faster unit tests.
- [Playwright](https://playwright.dev/) - e2e testing.
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - Standardized commit message format to automate changelogs and improve readability.
