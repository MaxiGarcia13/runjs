import { editor } from 'monaco-editor';
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
