import type { editor } from 'monaco-editor';

/** Aligned with CSS variables in `src/app.css` (`:root`). */
const THEME = {
  background: '282a36',
  foreground: 'f8f8f2',
  muted: '6272a4',
  subtle: '3b3a32',
  accent: 'ffb86c',
  success: '50fa7b',
  info: '8be9fd',
  purple: 'bd93f9',
  pink: 'ff79c6',
  yellow: 'f1fa8c',
  line: '44475a',
} as const;

export const draculaTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      background: THEME.background,
      token: '',
    },
    {
      foreground: THEME.muted,
      token: 'comment',
    },
    {
      foreground: THEME.yellow,
      token: 'string',
    },
    {
      foreground: THEME.purple,
      token: 'constant.numeric',
    },
    {
      foreground: THEME.purple,
      token: 'constant.language',
    },
    {
      foreground: THEME.purple,
      token: 'constant.character',
    },
    {
      foreground: THEME.purple,
      token: 'constant.other',
    },
    {
      foreground: THEME.pink,
      token: 'constant.character.escaped',
    },
    {
      foreground: THEME.pink,
      token: 'constant.character.escape',
    },
    {
      foreground: THEME.pink,
      token: 'string source',
    },
    {
      foreground: THEME.pink,
      token: 'string source.ruby',
    },
    {
      foreground: THEME.pink,
      token: 'keyword',
    },
    {
      foreground: THEME.pink,
      token: 'storage',
    },
    {
      foreground: THEME.purple,
      fontStyle: 'italic',
      token: 'storage.type',
    },
    {
      foreground: THEME.info,
      fontStyle: 'underline',
      token: 'entity.name.class',
    },
    {
      foreground: THEME.info,
      fontStyle: 'italic underline',
      token: 'entity.other.inherited-class',
    },
    {
      foreground: THEME.info,
      token: 'type.class',
    },
    {
      foreground: THEME.purple,
      token: 'type.class.readonly',
    },
    {
      foreground: THEME.purple,
      token: 'type.class.declaration.readonly',
    },
    {
      foreground: THEME.info,
      token: 'type.interface',
    },
    {
      foreground: THEME.purple,
      token: 'type.interface.readonly',
    },
    {
      foreground: THEME.purple,
      token: 'type.interface.declaration.readonly',
    },
    {
      foreground: THEME.info,
      token: 'type.namespace',
    },
    {
      foreground: THEME.info,
      token: 'type',
    },
    {
      foreground: THEME.purple,
      token: 'type.enum',
    },
    {
      foreground: THEME.success,
      token: 'entity.name.function',
    },
    {
      foreground: THEME.success,
      token: 'variable.function',
    },
    {
      foreground: THEME.success,
      token: 'variable.function.declaration',
    },
    {
      foreground: THEME.success,
      token: 'variable.function.defaultLibrary',
    },
    {
      foreground: THEME.success,
      token: 'member',
    },
    {
      foreground: THEME.success,
      token: 'member.declaration',
    },
    {
      foreground: THEME.success,
      token: 'member.defaultLibrary',
    },
    {
      foreground: THEME.success,
      token: 'support.function',
    },
    {
      foreground: THEME.accent,
      fontStyle: 'italic',
      token: 'variable.parameter',
    },
    {
      foreground: THEME.accent,
      token: 'type.parameters',
    },
    {
      foreground: THEME.purple,
      token: 'variable.readonly',
    },
    {
      foreground: THEME.purple,
      token: 'variable.declaration.readonly',
    },
    {
      foreground: THEME.purple,
      token: 'variable.declaration.readonly.defaultLibrary',
    },
    {
      foreground: THEME.purple,
      token: 'type.readonly',
    },
    {
      foreground: THEME.purple,
      token: 'type.declaration.readonly',
    },
    {
      foreground: THEME.purple,
      token: 'variable.enummember',
    },
    {
      foreground: THEME.purple,
      token: 'property.readonly',
    },
    {
      foreground: THEME.pink,
      token: 'entity.name.tag',
    },
    {
      foreground: THEME.purple,
      token: 'support.constant',
    },
    {
      foreground: THEME.info,
      fontStyle: 'italic',
      token: 'support.type',
    },
    {
      foreground: THEME.info,
      fontStyle: 'italic',
      token: 'support.class',
    },
    {
      foreground: THEME.foreground,
      background: THEME.pink,
      token: 'invalid',
    },
    {
      foreground: THEME.foreground,
      background: THEME.purple,
      token: 'invalid.deprecated',
    },
    {
      foreground: 'cfcfc2',
      token: 'meta.structure.dictionary.json string.quoted.double.json',
    },
    {
      foreground: THEME.muted,
      token: 'meta.diff',
    },
    {
      foreground: THEME.muted,
      token: 'meta.diff.header',
    },
    {
      foreground: THEME.pink,
      token: 'markup.deleted',
    },
    {
      foreground: THEME.success,
      token: 'markup.inserted',
    },
    {
      foreground: 'e6db74',
      token: 'markup.changed',
    },
    {
      foreground: THEME.purple,
      token: 'constant.numeric.line-number.find-in-files - match',
    },
    {
      foreground: 'e6db74',
      token: 'entity.name.filename',
    },
    {
      foreground: 'f83333',
      token: 'message.error',
    },
    {
      foreground: 'eeeeee',
      token: 'punctuation.definition.string.begin.json - meta.structure.dictionary.value.json',
    },
    {
      foreground: 'eeeeee',
      token: 'punctuation.definition.string.end.json - meta.structure.dictionary.value.json',
    },
    {
      foreground: THEME.info,
      token: 'meta.structure.dictionary.json string.quoted.double.json',
    },
    {
      foreground: THEME.yellow,
      token: 'meta.structure.dictionary.value.json string.quoted.double.json',
    },
  ],
  colors: {
    'editor.foreground': `#${THEME.foreground}`,
    'editor.background': `#${THEME.background}`,
    'editor.selectionBackground': `#${THEME.line}`,
    'editor.lineHighlightBackground': `#${THEME.line}`,
    'editorCursor.foreground': '#f8f8f0',
    'editorWhitespace.foreground': `#${THEME.subtle}`,
    'editorIndentGuide.activeBackground': '#9D550FB0',
    'editor.selectionHighlightBorder': '#222218',
  },
};
