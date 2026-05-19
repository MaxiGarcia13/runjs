# RunJS

RunJS is a browser-based JavaScript playground built with React and Vite.
Write code in Monaco, run it in a sandboxed preview runtime, and share snippets through the URL.

## Features

- Monaco editor with a custom Dracula-based theme, ligatures, and loop snippets (`for`, `forof`, `forin`).
- IntelliSense for preview runtime globals (`log`, `warn`, `error`, `logTable`, `perf`, `expect`).
- Live execution in an isolated iframe runtime (`sandbox="allow-scripts"`).
- Captured output for `console.log`, `console.warn`, `console.error`, `console.info`, and tabular data via `console.table` / `logTable`.
- URL-synced code state (debounced), so snippets can be shared as a link.
- One-click "Copy link" action in the header.
- Session history stored in `localStorage`, with rename, reopen, and delete actions.
- Resizable editor/preview layout (horizontal on desktop, vertical on mobile).
- Web app manifest and platform icons for installable/mobile-friendly behavior.

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
6. Starting a new session stores the previous snippet in session history (deduped by payload) for later retrieval.

## Editor

The editor is Monaco configured in `src/components/editor/config.ts`.

### Loop snippets

Type a prefix and pick the snippet from autocomplete (or press Tab/Enter to accept):

| Prefix  | Inserts                                                |
| ------- | ------------------------------------------------------ |
| `for`   | Indexed `for` loop                                     |
| `forof` | `for (const item of iterable)` — also matches “for of” |
| `forin` | `for (const key in object)` — also matches “for in”    |

Snippets expand with tab stops for the index/item/key, collection, and loop body.

### Runtime IntelliSense

The same config registers TypeScript extra libs so autocomplete and hovers work for preview-only globals (`log`, `warn`, `error`, `logTable`, `perf`, `expect` and their matcher methods).

## Runtime Helpers

Inside the preview runtime, a few global helper functions are available in addition to `console.*`:

- `log(...args)` - same behavior as `console.log(...)`, output appears in the preview panel.
- `warn(...args)` - same behavior as `console.warn(...)`.
- `error(...args)` - same behavior as `console.error(...)`.
- `info(...args)` - same behavior as `console.info(...)`.
- `logTable(...args)` - same behavior as `console.table(...)`, rendered as a table in the preview panel.
- `expect(value)` - creates async assertions with `toBe(...)` (strict equality) and `toEqual(...)` (deep equality).

### `perf` helper

`perf` calls your function and prints:

- `=>[perf] Function name: <label>`
- `duration: <ms>ms`
- `memory usage: <delta> MB` (or `unavailable in this browser/runtime`)

`perf` returns the wrapped function result. If the function is async/Promise-like, `perf` returns that Promise and reports metrics in a `finally` block.

Sync example:

```js
perf(
  () => {
    for (let i = 0; i < 1_000_000; i++) {
      // do something
    }
  },
  { label: 'loop' },
);
```

Async example:

```js
await perf(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 250));
  },
  { label: 'fetch simulation' },
);
```

Supported `options`:

- `label` (`string`) - custom function name shown by the helper. Defaults to `fn.name` or `anonymous`.

### `expect` helper

`expect` can receive either a direct value or a callback. If a callback is provided, it is awaited before each assertion.

Available matchers:

- `expect(value).toBe(expected)` - checks strict equality (`===`) and returns a Promise.
- `expect(value).toEqual(expected)` - checks deep structural equality and returns a Promise.
- `expect(value).stringMatching(expected)` - checks that a string contains `expected` (when `expected` is a string) or matches it (when `expected` is a RegExp).
- `expect(value).objectContaining(expectedObject)` - checks that all expected keys exist in the received object and their values are deep-equal.
- `expect(value).arrayContaining(expectedArray)` - checks that each expected item exists in the received array using deep equality.

Examples:

```js
expect(2 + 2).toBe(4);
expect({ id: 1, tags: ['a'] }).toEqual({ id: 1, tags: ['a'] });
expect(() => Promise.resolve({ id: 1 })).toEqual({ id: 1 });
expect('Hello World').stringMatching('World');
expect('Version v1.2.3').stringMatching(/v\d+\.\d+\.\d+/);
expect({ id: 1, user: { name: 'Max' } }).objectContaining({
  user: { name: 'Max' },
});
expect([{ id: 1 }, { id: 2 }]).arrayContaining([{ id: 2 }]);
```

## Contributing

1. Create a branch for your change.
2. Run `npm run lint` before opening a PR.
3. Keep changes focused and include a clear PR description.
