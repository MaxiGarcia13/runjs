import { editor, typescript } from 'monaco-editor';
import { draculaTheme } from './themes/dracula';

const THEME_NAME = 'dracula';

editor.defineTheme(THEME_NAME, draculaTheme);

editor.setTheme(THEME_NAME);

export const EDITOR_CONSTRUCTION_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  language: 'javascript',
  theme: THEME_NAME,

  fontFamily: 'Fira Code, monospace',
  fontLigatures: true,
  fontSize: 16,

  minimap: {
    enabled: false,
  },

  lineNumbers: 'off',
  glyphMargin: false,
  renderWhitespace: 'all',

  wordWrap: 'on',
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'off',
  tabSize: 2,

  automaticLayout: true,
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,

  padding: {
    top: 16,
  },
};

export const RUNJS_RUNTIME_GLOBALS = `
/** Same as \`console.log\`, but output is also sent to the RunJS preview panel (and mirrored to the browser console). */
declare function log(...args: unknown[]): void;
/** Same as \`console.warn\`, but output is also sent to the RunJS preview panel (and mirrored to the browser console). */
declare function warn(...args: unknown[]): void;
/** Same as \`console.error\`, but output is also sent to the RunJS preview panel (and mirrored to the browser console). */
declare function error(...args: unknown[]): void;

interface PerfOptions {
  /** Label printed in perf logs; defaults to \`fn.name\` or \`"anonymous"\`. */
  label?: string;
}

/**
 * Runs a function, then logs timing (ms) and approximate JS heap delta (when available).
 * If the function returns a thenable, metrics are reported in a \`finally\` callback after it settles.
 * @returns Whatever \`fn\` returns (including a Promise if \`fn\` is async).
 */
declare function perf<TResult, TArgs extends unknown[] = []>(
  fn: (...args: TArgs) => TResult,
  options?: PerfOptions,
  ...args: TArgs
): TResult;
`;

typescript.javascriptDefaults.addExtraLib(RUNJS_RUNTIME_GLOBALS, 'runjs-runtime.d.ts');
