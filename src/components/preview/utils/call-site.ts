export interface CallSite {
  line: number;
  column: number;
}

/**
 * Resolves the user-code call site from a stack trace.
 * Prefers frames from `(0, eval)(userCode)` (`<anonymous>:line:col`) over the
 * about:srcdoc wrapper that invokes eval.
 */
export function getCallSite(): CallSite | null {
  const stack = new Error('call site').stack?.split('\n') ?? [];

  for (const frame of stack) {
    if (frame.includes('/preview/scripts/'))
      continue;

    // Chrome/Firefox: ... <anonymous>:12:1)  (eval'd user source)
    const evalMatch = frame.match(/<anonymous>:(\d+):(\d+)/);
    if (evalMatch) {
      return {
        line: Number(evalMatch[1]),
        column: Number(evalMatch[2]),
      };
    }
  }

  // Fallback: last frame with :line:col (legacy inline-script stacks)
  for (let index = stack.length - 1; index >= 0; index -= 1) {
    const frame = stack[index];
    if (!frame || frame.includes('/preview/scripts/'))
      continue;

    const match = frame.match(/:(\d+):(\d+)\)?$/);
    if (match) {
      return {
        line: Number(match[1]),
        column: Number(match[2]),
      };
    }
  }

  return null;
}
