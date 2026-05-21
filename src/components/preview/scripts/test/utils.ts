import { isSpy } from './spy';

export async function getValue<T>(value: T) {
  if (isSpy(value))
    return value;

  if (typeof value === 'function') {
    return await (value as () => unknown)();
  }

  return value;
}
