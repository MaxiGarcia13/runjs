# runjs

Online JavaScript Playground built with React and Vite.

## Tech Stack

- React 19
- Vite 8
- TypeScript configuration (bundler mode)
- ESLint

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Run ESLint and auto-fix issues

## Project Structure

```txt
.
├─ public/
│  └─ favicon.png
├─ src/
│  ├─ app.tsx
│  └─ main.tsx
├─ index.html
├─ tsconfig.json
└─ vite.config.mjs
```

## Current Status

This is currently a minimal starter app and renders:

`Hello World`

You can begin building the playground UI and execution logic from `src/app.tsx`.
