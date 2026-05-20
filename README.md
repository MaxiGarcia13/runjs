# RunJS

RunJS is a browser-based JavaScript playground built with React and Vite.
Write code in Monaco, run it in a sandboxed preview runtime, and share snippets through the URL.

## Features

- Monaco editor with a custom Dracula-based theme, Fira Code ligatures, bracket pair colorization, and TypeScript-powered semantic highlighting.
- Built-in snippets (`if`, `try`, `for`, `forof`, `forin`) with tab stops.
- IntelliSense for preview runtime globals (`log`, `warn`, `error`, `logTable`, `perf`, `expect`, `spyOn`).
- Editor context menu (copy, cut, paste, select all) via right-click or long-press on touch devices.
- Live execution in an isolated iframe runtime (`sandbox="allow-scripts"`).
- Captured output for `console.log`, `console.warn`, `console.error`, `console.info`, and tabular data via `console.table` / `logTable`.
- Lightweight test helpers: `expect` matchers and `spyOn` for call tracking.
- URL-synced code state (debounced), so snippets can be shared as a link.
- Header actions: copy link, session history, new instance, code snapshot (PNG), and open in ChatGPT.
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
- ESLint (with pre-commit lint-staged via simple-git-hooks)

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
- `npm run phoenix` - clean `dist` and `node_modules`, reinstall, and build

## How It Works

1. The editor content is stored in a Zustand store.
2. Changes are debounced and encoded into the `code` URL parameter.
3. The preview builds an HTML runtime and injects your code into a `try/catch` block.
4. Console calls are intercepted in the iframe and sent to the app via `postMessage`.
5. Output is rendered in the preview panel with type-aware styling.
6. Starting a new session stores the previous snippet in session history (deduped by payload) for later retrieval.

## Editor

The editor is Monaco configured in `src/components/editor/config.ts`. A custom TypeScript worker (`ts.worker.ts`) exposes semantic classifications to a document-range semantic tokens provider (`semantic-tokens.ts`), so variables, parameters, types, and members are highlighted beyond plain syntax coloring.

### Snippets

Type a prefix and pick the snippet from autocomplete (or press Tab/Enter to accept):

| Prefix  | Inserts                                                |
| ------- | ------------------------------------------------------ |
| `if`    | `if (condition) { }`                                   |
| `try`   | `try { } catch (error) { }` — also matches “try catch” |
| `for`   | Indexed `for` loop                                     |
| `forof` | `for (const item of iterable)` — also matches “for of” |
| `forin` | `for (const key in object)` — also matches “for in”    |

Snippets expand with tab stops for conditions, bindings, collections, and loop bodies.

### Runtime IntelliSense

The same config registers TypeScript extra libs so autocomplete and hovers work for preview-only globals (`log`, `warn`, `error`, `logTable`, `perf`, `expect`, `spyOn`, and their matcher methods).

## Runtime Helpers

Inside the preview runtime, a few global helper functions are available in addition to `console.*`:

- `log(...args)` - same behavior as `console.log(...)`, output appears in the preview panel.
- `warn(...args)` - same behavior as `console.warn(...)`.
- `error(...args)` - same behavior as `console.error(...)`.
- `info(...args)` - same behavior as `console.info(...)`.
- `logTable(...args)` - same behavior as `console.table(...)`, rendered as a table in the preview panel.
- `expect(value)` - creates async assertions with matchers (see below).
- `spyOn(object, methodName)` - wraps a method to record calls while still invoking the original implementation.

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
- `expect(spy).toHaveBeenCalled()` - checks that a spy created with `spyOn` was called at least once.
- `expect(spy).toHaveBeenCalledTimes(n)` - checks an exact call count.
- `expect(spy).toHaveBeenCalledWith(...args)` - checks that at least one call used the given arguments (deep equality).

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

### `spyOn` helper

`spyOn` replaces an object method with a wrapper that records every call (arguments and return/throw results) while still running the original implementation.

- `spy.mock.calls` - array of argument lists, one per call.
- `spy.mock.results` - array of `{ type: 'return' | 'throw', value }` per call.
- `spy.mockRestore()` - restores the original method on the object.

Example:

```js
const counter = {
  value: 0,
  increment() {
    this.value += 1;
  },
};
const incrementSpy = spyOn(counter, 'increment');

counter.increment();
counter.increment();

expect(incrementSpy).toHaveBeenCalled();
expect(incrementSpy).toHaveBeenCalledTimes(2);
expect(incrementSpy).toHaveBeenCalledWith();

incrementSpy.mockRestore();
```

## Contributing

1. Create a branch for your change.
2. Run `npm run lint` before opening a PR (pre-commit hooks also run `lint:fix` on staged files).
3. Keep changes focused and include a clear PR description.
