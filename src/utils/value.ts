import { isRecord, tryParseJson } from '@maxigarcia/js-utils';

export function indentValue(value: unknown, indent: number = 2) {
  if (value == null) {
    return '';
  }

  if (isRecord(value) || Array.isArray(value)) {
    return JSON.stringify(value, null, indent);
  }

  const parsedValue = tryParseJson(String(value));

  if (isRecord(parsedValue) || Array.isArray(parsedValue)) {
    return JSON.stringify(parsedValue, null, indent);
  }

  return String(value);
}
