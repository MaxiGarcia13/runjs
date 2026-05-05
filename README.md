# RunJS

RunJS is a browser-based JavaScript playground built with React and Vite.
Write code in Monaco, run it in a sandboxed preview runtime, and share snippets through the URL.

## Features

- Monaco editor with a custom Dracula-based theme and ligatures.
- Live execution in an isolated iframe runtime (`sandbox="allow-scripts"`).
- Captured output for `console.log`, `console.warn`, `console.error`, and `console.info`.
- URL-synced code state (debounced), so snippets can be shared as a link.
- One-click "Copy link" action in the header.
- Resizable editor/preview layout (horizontal on desktop, vertical on mobile).

## Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS 4
- Monaco Editor
- Zustand
- ESLint

## Getting Started

### Prerequisites

- Node.js (current LTS recommended)
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint checks
- `npm run lint:fix` - run ESLint and auto-fix issues

## How It Works

1. The editor content is stored in a Zustand store.
2. Changes are debounced and encoded into the `code` URL parameter.
3. The preview builds an HTML runtime and injects your code into a `try/catch` block.
4. Console calls are intercepted in the iframe and sent to the app via `postMessage`.
5. Output is rendered in the preview panel with type-aware styling.

## Contributing

1. Create a branch for your change.
2. Run `npm run lint` before opening a PR.
3. Keep changes focused and include a clear PR description.
