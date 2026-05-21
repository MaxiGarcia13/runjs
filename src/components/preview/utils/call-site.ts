export interface CallSite {
  line: number;
  column: number;
}

export function getCallSite(): CallSite | null {
  const stack = new Error('call site').stack?.split('\n');
  const caller = stack?.[stack.length - 1] || '';

  const match = caller.match(/:(\d+):(\d+)\)?$/);

  if (!match) {
    return null;
  }

  return {
    line: Number(match[1]),
    column: Number(match[2]),
  };
}
