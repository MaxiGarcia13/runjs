import { initialize } from 'monaco-editor/esm/vs/common/initialize.js';
import { TypeScriptWorker } from 'monaco-editor/esm/vs/language/typescript/tsWorker.js';

interface EncodedSemanticClassifications {
  spans: number[];
  endOfLineState: number;
}

interface TypeScriptLanguageService {
  getEncodedSemanticClassifications: (
    fileName: string,
    span: { start: number; length: number },
    format: '2020',
  ) => EncodedSemanticClassifications;
}

interface TypeScriptWorkerInstance {
  getLanguageService: () => TypeScriptLanguageService;
}

type TypeScriptWorkerConstructor = new (
  ctx: unknown,
  createData: unknown,
) => TypeScriptWorkerInstance;

const BaseTypeScriptWorker = TypeScriptWorker as unknown as TypeScriptWorkerConstructor;

class ExtendedTypeScriptWorker extends BaseTypeScriptWorker {
  async getEncodedSemanticClassifications(
    fileName: string,
    span: { start: number; length: number },
  ): Promise<EncodedSemanticClassifications> {
    return this.getLanguageService().getEncodedSemanticClassifications(
      fileName,
      span,
      '2020',
    );
  }
}

globalThis.onmessage = () => {
  initialize((ctx, createData) => {
    return new ExtendedTypeScriptWorker(ctx, createData);
  });
};
