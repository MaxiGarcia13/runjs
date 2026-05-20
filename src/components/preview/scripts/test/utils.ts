import { isSpy } from './spy';

export function formatValue(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export async function getValue<T>(value: T) {
  if (isSpy(value))
    return value;

  if (typeof value === 'function') {
    return await (value as () => unknown)();
  }

  return value;
}
