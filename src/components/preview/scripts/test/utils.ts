export function formatValue(value: unknown) {
  return JSON.stringify(value, null, 2);
}
