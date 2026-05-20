import { formatValue } from './utils';

export interface SpyMock {
  calls: unknown[][];
  results: Array<{ type: 'return' | 'throw'; value: unknown }>;
}

export interface SpyFn {
  (...args: unknown[]): unknown;
  mock: SpyMock;
  mockRestore: () => void;
}

function formatCallArgs(args: unknown[]) {
  if (args.length === 0)
    return '(no arguments)';

  return formatValue(args);
}

export function formatSpyCalls(calls: unknown[][]) {
  if (calls.length === 0)
    return 'not called';

  const lines = calls.map((args, index) => `  #${index + 1}: ${formatCallArgs(args)}`);

  return `called ${calls.length} time${calls.length === 1 ? '' : 's'}:\n${lines.join('\n')}`;
}

export function formatSpyCallCount(calls: unknown[][]) {
  if (calls.length === 0)
    return 'not called';

  return `${calls.length} call${calls.length === 1 ? '' : 's'}`;
}

export function isSpy(value: unknown): value is SpyFn {
  return (
    typeof value === 'function'
    && value != null
    && 'mock' in value
    && Array.isArray((value as SpyFn).mock?.calls)
  );
}

export function spyOn<T extends object>(object: T, methodName: keyof T & string): SpyFn {
  const original = object[methodName];

  if (typeof original !== 'function') {
    throw new TypeError(`spyOn: "${methodName}" is not a function on the given object`);
  }

  const mock: SpyMock = {
    calls: [],
    results: [],
  };

  const spy = function (this: unknown, ...args: unknown[]) {
    mock.calls.push(args);

    try {
      const result = (original as (...args: unknown[]) => unknown).apply(this, args);
      mock.results.push({ type: 'return', value: result });
      return result;
    } catch (error) {
      mock.results.push({ type: 'throw', value: error });
      throw error;
    }
  } as SpyFn;

  spy.mock = mock;
  spy.mockRestore = () => {
    (object as Record<string, unknown>)[methodName] = original;
  };

  (object as Record<string, unknown>)[methodName] = spy;

  return spy;
}
