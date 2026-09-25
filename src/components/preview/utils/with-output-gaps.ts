import type { Output } from '../types';

/** Matches Monaco's default line height for fontSize 15 (`Math.round(15 * 1.5)`). */
export const OUTPUT_LINE_HEIGHT_PX = 23;

export type OutputListItem
  = | { kind: 'output'; output: Output }
    | { kind: 'gap'; id: string; lines: number };

/**
 * Inserts spacer entries for missing source lines between consecutive outputs
 * that have a `callSite.line` (e.g. line 4 then 6 → 1 gap line).
 */
export function withOutputGaps(outputs: Output[]): OutputListItem[] {
  const items: OutputListItem[] = [];
  let previousLine = 0;

  for (const output of outputs) {
    const line = output.callSite?.line;

    if (line != null && line > previousLine + 1) {
      items.push({
        kind: 'gap',
        id: `gap-${previousLine}-${line}`,
        lines: line - previousLine - 1,
      });
    }

    items.push({ kind: 'output', output });

    if (line != null) {
      previousLine = Math.max(previousLine, line);
    }
  }

  return items;
}
