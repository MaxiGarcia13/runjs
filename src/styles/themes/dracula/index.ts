const DRACULA_COLORS = {
  background: '282a36',
  foreground: 'f8f8f2',
  comment: '6272a4',
  invisibles: '3b3a32',
  currentLine: '44475a',
  orange: 'ffb86c',
  green: '50fa7b',
  red: 'ff5555',
  cyan: '8be9fd',
  purple: 'bd93f9',
  pink: 'ff79c6',
  yellow: 'f1fa8c',
} as const;

export const DRACULA_PALETTE = {
  ...DRACULA_COLORS,
  muted: DRACULA_COLORS.comment,
  subtle: DRACULA_COLORS.invisibles,
  line: DRACULA_COLORS.currentLine,
  surface: DRACULA_COLORS.currentLine,
  accent: DRACULA_COLORS.orange,
  success: DRACULA_COLORS.green,
  danger: DRACULA_COLORS.red,
  info: DRACULA_COLORS.cyan,
  highlight: DRACULA_COLORS.purple,
} as const;
