# Fios da Ria

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

### Static hosting and languages

Portuguese uses `/`, `/about/`, `/gallery/`, etc.; English uses `/en/`.
GitHub Pages cannot execute next-intl middleware. `pnpm run build` therefore
copies the Portuguese HTML and navigation payloads from `out/pt/` to `out/`
after Next.js exports the site. Deploy the resulting `out/` directory.
The original `out/pt/` files remain available for older links and internal routes.

## 📄 License

This project is licensed under the MIT License.
