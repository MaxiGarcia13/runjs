import { editor, languages, typescript } from 'monaco-editor';
import { registerJavaScriptSemanticTokensProvider } from './semantic-tokens';
import { draculaTheme } from './themes/dracula';
import './worker';

const THEME_NAME = 'dracula';

registerJavaScriptSemanticTokensProvider();

editor.defineTheme(THEME_NAME, draculaTheme);

editor.setTheme(THEME_NAME);

export const EDITOR_CONSTRUCTION_OPTIONS: editor.IStandaloneEditorConstructionOptions = {
  'language': 'javascript',
  'theme': THEME_NAME,

  'fontFamily': 'Fira Code, monospace',
  'fontLigatures': true,
  'fontSize': 16,

  'formatOnType': true,
  'formatOnPaste': true,

  'tabSize': 2,

  'minimap': {
    enabled: false,
  },

  'lineNumbers': 'on',
  'glyphMargin': false,
  'renderWhitespace': 'all',
  'bracketPairColorization': {
    enabled: true,
  },

  'semanticHighlighting.enabled': true,

  'wordWrap': 'on',
  'cursorBlinking': 'expand',

  'automaticLayout': true,
  'fixedOverflowWidgets': true,
  'scrollBeyondLastLine': false,
  'roundedSelection': false,

  'padding': {
    top: 16,
  },

  'lineDecorationsWidth': 0,
  'lineNumbersMinChars': 3,
};

export const RUNJS_RUNTIME_GLOBALS = `
/** Same as \`console.log\`, but output is also sent to the RunJS preview panel (and mirrored to the browser console). */
declare function log(...args: unknown[]): void;
/** Same as \`console.warn\`, but output is also sent to the RunJS preview panel (and mirrored to the browser console). */
declare function warn(...args: unknown[]): void;
/** Same as \`console.error\`, but output is also sent to the RunJS preview panel (and mirrored to the browser console). */
declare function error(...args: unknown[]): void;
/** Same as \`console.table\`, but output is rendered as a table in the RunJS preview panel. */
declare function logTable(...args: unknown[]): void;

interface PerfOptions {
  /** Label printed in perf logs; defaults to \`fn.name\` or \`"anonymous"\`. */
  label?: string;
}

interface SpyMock {
  calls: unknown[][];
  results: Array<{ type: 'return' | 'throw'; value: unknown }>;
}

interface SpyFn {
  (...args: unknown[]): unknown;
  mock: SpyMock;
  /** Restores the original method on the spied object. */
  mockRestore(): void;
}

interface ExpectMatcher {
  /** Checks strict equality (\`===\`) and prints a pass/fail message in the preview output. */
  toBe(expected: boolean | number | string | null | undefined): Promise<void>;
  /** Checks deep equality and prints a pass/fail message in the preview output. */
  toEqual(expected: boolean | number | string | null | undefined | object | unknown[]): Promise<void>;
  /** Checks that a received string contains the expected string or matches the expected RegExp. */
  stringMatching(expected: string | RegExp): Promise<void>;
  /** Checks that all expected object keys exist and their values deep-equal the received object. */
  objectContaining(expected: object): Promise<void>;
  /** Checks that every expected item exists in the received array (deep equality). */
  arrayContaining(expected: unknown[]): Promise<void>;
  /** Checks that a spy was called at least once. */
  toHaveBeenCalled(): Promise<void>;
  /** Checks that a spy was called an exact number of times. */
  toHaveBeenCalledTimes(expected: number): Promise<void>;
  /** Checks that a spy was called with the given arguments (deep equality, any call). */
  toHaveBeenCalledWith(...expected: unknown[]): Promise<void>;
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
/**
 * Creates assertion matchers for a value or lazy callback.
 * If a function is provided, it is awaited before running each matcher.
 */
declare function expect<T>(value: T | (() => T | Promise<T>)): ExpectMatcher;
/**
 * Wraps an object method to record calls while still invoking the original implementation.
 * Use \`mockRestore()\` on the returned spy to put the method back.
 */
declare function spyOn<T extends object>(object: T, methodName: keyof T & string): SpyFn;
`;

typescript.javascriptDefaults.addExtraLib(RUNJS_RUNTIME_GLOBALS, 'runjs-runtime.d.ts');

const EDITOR_SNIPPETS: Omit<languages.CompletionItem, 'range'>[] = [
  {
    label: 'if',
    kind: languages.CompletionItemKind.Snippet,
    // eslint-disable-next-line no-template-curly-in-string
    insertText: 'if (${1:condition}) {\n\t$0\n}',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'If statement',
    detail: 'if (condition)',
  },
  {
    label: 'try',
    filterText: 'try catch trycatch',
    kind: languages.CompletionItemKind.Snippet,
    // eslint-disable-next-line no-template-curly-in-string
    insertText: 'try {\n\t$0\n} catch (${1:error}) {\n\t${2}\n}',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Try/catch',
    detail: 'try { } catch (error) { }',
  },
  {
    label: 'for',
    kind: languages.CompletionItemKind.Snippet,
    // eslint-disable-next-line no-template-curly-in-string
    insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t$0\n}',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'For loop',
    detail: 'for (let i = 0; i < array.length; i++)',
  },
  {
    label: 'forof',
    filterText: 'for of forof',
    kind: languages.CompletionItemKind.Snippet,
    // eslint-disable-next-line no-template-curly-in-string
    insertText: 'for (const ${1:item} of ${2:iterable}) {\n\t$0\n}',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'For-of loop',
    detail: 'for (const item of iterable)',
  },
  {
    label: 'forin',
    filterText: 'for in forin',
    kind: languages.CompletionItemKind.Snippet,
    // eslint-disable-next-line no-template-curly-in-string
    insertText: 'for (const ${1:key} in ${2:object}) {\n\t$0\n}',
    insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'For-in loop',
    detail: 'for (const key in object)',
  },
];

languages.registerCompletionItemProvider('javascript', {
  provideCompletionItems: (model, position) => {
    const word = model.getWordUntilPosition(position);
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    return {
      suggestions: EDITOR_SNIPPETS.map((snippet) => ({ ...snippet, range })),
    };
  },
});
