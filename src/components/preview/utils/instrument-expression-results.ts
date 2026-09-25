import type { Node } from 'acorn';
import { parse, tokenizer, tokTypes as tt } from 'acorn';

/** Tokens that can end an expression and then hit an ASI hazard on the next line. */
const EXPRESSION_END_TOKEN = new Set([
  tt.name,
  tt.num,
  tt.string,
  tt.regexp,
  tt.parenR,
  tt.bracketR,
  tt.braceR,
  tt.backQuote,
  tt.incDec,
  tt._true,
  tt._false,
  tt._null,
  tt._this,
  tt._super,
]);

/** Next-line tokens that continue an expression unless a semicolon is inserted. */
const ASI_HAZARD_TOKEN = new Set([
  tt.bracketL,
  tt.parenL,
  tt.backQuote,
]);

/**
 * Inserts explicit `;` before classic ASI hazards (`)\\n[`, `)\\n(`, …)
 * so REPL-style lines are treated as separate statements.
 * Skips strings/comments by using the tokenizer.
 */
export function breakAsiHazards(code: string): string {
  try {
    const tokens = Array.from(tokenizer(code, {
      ecmaVersion: 'latest',
      allowAwaitOutsideFunction: true,
      allowReturnOutsideFunction: true,
    }));

    const insertAt: number[] = [];

    for (let index = 1; index < tokens.length; index += 1) {
      const previous = tokens[index - 1];
      const current = tokens[index];

      if (!EXPRESSION_END_TOKEN.has(previous.type) || !ASI_HAZARD_TOKEN.has(current.type))
        continue;

      const between = code.slice(previous.end, current.start);
      if (!between.includes('\n'))
        continue;

      // Place `;` right after the previous token (e.g. `a();` + newline + `[...]`).
      insertAt.push(previous.end);
    }

    let result = code;
    for (const position of insertAt.sort((a, b) => b - a)) {
      result = `${result.slice(0, position)};${result.slice(position)}`;
    }

    return result;
  } catch {
    return code;
  }
}

function collectExpressionStatementRanges(node: Node, ranges: Array<{ start: number; end: number }>) {
  if (node.type === 'ExpressionStatement') {
    // Skip "use strict" / directive prologues — not useful as output.
    if (!('directive' in node && node.directive)) {
      ranges.push({ start: node.start, end: node.end });
    }
  }

  for (const value of Object.values(node)) {
    if (!value || typeof value !== 'object')
      continue;

    if (Array.isArray(value)) {
      for (const child of value) {
        if (child && typeof child === 'object' && 'type' in child) {
          collectExpressionStatementRanges(child as Node, ranges);
        }
      }
      continue;
    }

    if ('type' in value) {
      collectExpressionStatementRanges(value as Node, ranges);
    }
  }
}

/**
 * Wraps each expression statement so its value is reported via `reportResult`.
 * Enables REPL-style output for values that are not the program's final completion
 * (e.g. `2 + 2` followed by `log("hi")`).
 */
export function instrumentExpressionResults(code: string): string {
  const source = breakAsiHazards(code);
  let ast: Node;

  try {
    ast = parse(source, {
      ecmaVersion: 'latest',
      sourceType: 'script',
      allowAwaitOutsideFunction: true,
      allowReturnOutsideFunction: true,
    });
  } catch {
    // Let the iframe eval surface the syntax error.
    return code;
  }

  const ranges: Array<{ start: number; end: number }> = [];
  collectExpressionStatementRanges(ast, ranges);

  // Apply wraps from the end so earlier offsets stay valid.
  let result = source;
  for (const { start, end } of ranges.sort((a, b) => b.start - a.start)) {
    const statement = source.slice(start, end);
    const trimmed = statement.trimEnd();
    const expression = trimmed.endsWith(';') ? trimmed.slice(0, -1) : trimmed;
    const trailingWhitespace = statement.slice(trimmed.length);

    // Always terminate with `;` so the next line cannot ASI-continue this wrap.
    result = `${result.slice(0, start)}reportResult(${expression});${trailingWhitespace}${result.slice(end)}`;
  }

  return result;
}
