export type Variant
  = 'log'
    | 'warn'
    | 'error'
    | 'info'
    | 'perf-log'
    | 'test-log';

export interface CallSite {
  line: number;
  column: number;
}

export interface Output {
  id: string;
  type: Variant;
  content?: OutputContent;
  callSite?: CallSite;
}

export type OutputContent = string | OutputTestContent;

export interface OutputTestContent {
  expected: string;
  actual: string;
  isPassed: boolean;
}
