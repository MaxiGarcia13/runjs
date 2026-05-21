import { isRecord, tryParseJson } from '@maxigarcia/js-utils';

export function indentStringValue(value: unknown, indent: number = 2) {
  if (value == null) {
    return '';
  }

  const parsedValue = tryParseJson(String(value));

  if (isRecord(parsedValue) || Array.isArray(parsedValue)) {
    return JSON.stringify(parsedValue, null, indent);
  }

  return String(value);
}
