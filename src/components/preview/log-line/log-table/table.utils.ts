import { isRecord, tryParseJson } from '@maxigarcia/js-utils';

export function formatTableCell(value: unknown): string {
  if (value === undefined)
    return 'undefined';

  if (value === null)
    return 'null';

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  return String(value);
}

export function buildTable(content: string): { columns: string[]; rows: string[][] } {
  const parsed = tryParseJson(content);

  if (Array.isArray(parsed)) {
    if (parsed.length === 0)
      return { columns: [], rows: [] };

    const records = parsed.filter(isRecord);
    if (records.length === parsed.length) {
      const dataColumns = [...new Set(records.flatMap((record) => Object.keys(record)))];
      const columns = ['(index)', ...dataColumns];
      const rows = records.map((record, index) => [
        String(index),
        ...dataColumns.map((column) => formatTableCell(record[column])),
      ]);

      return { columns, rows };
    }

    return {
      columns: ['(index)', 'Value'],
      rows: parsed.map((value, index) => [String(index), formatTableCell(value)]),
    };
  }

  if (isRecord(parsed)) {
    const columns = Object.keys(parsed);
    const rows = [columns.map((column) => formatTableCell(parsed[column]))];

    return { columns, rows };
  }

  return { columns: [], rows: [] };
}
