import type { editor, languages } from 'monaco-editor';
import { languages as monacoLanguages, Range, typescript } from 'monaco-editor';

/** Matches TypeScript's encoded semantic token legend (format "2020"). */
const SEMANTIC_TOKENS_LEGEND: languages.SemanticTokensLegend = {
  tokenTypes: [
    'type.class',
    'type.enum',
    'type.interface',
    'type.namespace',
    'type.parameters',
    'type',
    'variable.parameter',
    'variable',
    'variable.enummember',
    'property',
    'variable.function',
    'member',
  ],
  tokenModifiers: [
    'declaration',
    'static',
    'async',
    'readonly',
    'defaultLibrary',
    'local',
  ],
};

interface EncodedSemanticClassifications {
  spans: number[];
  endOfLineState: number;
}

interface JavaScriptWorkerWithSemanticTokens {
  getEncodedSemanticClassifications: (
    fileName: string,
    span: { start: number; length: number },
  ) => Promise<EncodedSemanticClassifications>;
}

function offsetToRange(
  model: editor.ITextModel,
  start: number,
  length: number,
): Range {
  const end = start + length;
  const startPosition = model.getPositionAt(start);
  const endPosition = model.getPositionAt(end);

  return new Range(
    startPosition.lineNumber,
    startPosition.column,
    endPosition.lineNumber,
    endPosition.column,
  );
}

function spansToSemanticTokens(
  model: editor.ITextModel,
  spans: number[],
): Uint32Array {
  const data: number[] = [];
  let prevLine = 1;
  let prevStart = 1;

  for (let i = 0; i + 2 < spans.length; i += 3) {
    const start = spans[i];
    const length = spans[i + 1];
    const typeAndModifier = spans[i + 2];

    let type = typeAndModifier >> 8;
    if (!type) {
      continue;
    }

    type -= 1;
    const modifier = typeAndModifier & 0xFF;

    const { startLineNumber, startColumn, endLineNumber } = offsetToRange(
      model,
      start,
      length,
    );

    if (startLineNumber !== endLineNumber) {
      continue;
    }

    const deltaLine = startLineNumber - prevLine;
    const deltaStart = deltaLine === 0 ? startColumn - prevStart : startColumn - 1;

    prevLine = startLineNumber;
    prevStart = startColumn;

    data.push(deltaLine, deltaStart, length, type, modifier);
  }

  return new Uint32Array(data);
}

function rangeToSpan(model: editor.ITextModel, range: Range) {
  const start = model.getOffsetAt({
    lineNumber: range.startLineNumber,
    column: range.startColumn,
  });
  const end = model.getOffsetAt({
    lineNumber: range.endLineNumber,
    column: range.endColumn,
  });

  return { start, length: end - start };
}

const semanticTokensProvider: languages.DocumentRangeSemanticTokensProvider = {
  getLegend: () => SEMANTIC_TOKENS_LEGEND,

  provideDocumentRangeSemanticTokens: async (model, range) => {
    const getWorker = await typescript.getJavaScriptWorker();
    const worker = await getWorker(model.uri) as unknown as JavaScriptWorkerWithSemanticTokens;
    const span = rangeToSpan(model, range);
    const result = await worker.getEncodedSemanticClassifications(
      model.uri.toString(),
      span,
    );

    if (!result?.spans?.length || model.isDisposed()) {
      return { data: new Uint32Array(0) };
    }

    return { data: spansToSemanticTokens(model, result.spans) };
  },
};

export function registerJavaScriptSemanticTokensProvider() {
  return monacoLanguages.registerDocumentRangeSemanticTokensProvider(
    'javascript',
    semanticTokensProvider,
  );
}
