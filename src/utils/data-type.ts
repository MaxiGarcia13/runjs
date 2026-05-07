export function isPrimitive(value: any) {
  return typeof value !== 'object' || value === null;
}

export function isString(value: any) {
  return typeof value === 'string';
}

export function isRegExp(value: any) {
  return value instanceof RegExp;
}

export function isObject(value: any) {
  return typeof value === 'object' && value !== null;
}

export function isThenable(value: any) {
  return isObject(value) && typeof value.then === 'function';
}
