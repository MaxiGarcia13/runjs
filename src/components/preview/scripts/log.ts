import type { Variant } from '../types';
import { isObject } from '@/utils/data-type';

const originalLog = console.log.bind(console);
const originalWarn = console.warn.bind(console);
const originalError = console.error.bind(console);
const originalInfo = console.info.bind(console);

function overwriteFunction(originalFunction: (...args: any[]) => void, type: Variant) {
  return (...args: any[]) => {
    window.parent.postMessage(
      {
        source: 'runjs-preview',
        payload: args,
        id: args.join('-'),
        type,
      },
      '*',
    );

    originalFunction(...args);
  };
}

console.log = overwriteFunction(originalLog, 'log');
console.warn = overwriteFunction(originalWarn, 'warn');
console.error = overwriteFunction(originalError, 'error');
console.info = overwriteFunction(originalInfo, 'info');

declare global {
  interface Console {
    perfLog: (...args: any[]) => void;
    testLog: (...args: any[]) => void;
  }
}

console.perfLog = overwriteFunction(originalInfo, 'perf-log');
console.testLog = overwriteFunction(originalInfo, 'test-log');

declare global {
  interface Window {
    log: typeof console.log;
    warn: typeof console.warn;
    error: typeof console.error;
    info: typeof console.info;
  }
}

if (isObject(window)) {
  window.log = overwriteFunction(originalLog, 'log');
  window.warn = overwriteFunction(originalWarn, 'warn');
  window.error = overwriteFunction(originalError, 'error');
  window.info = overwriteFunction(originalInfo, 'info');
}
