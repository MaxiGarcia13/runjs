import type { Variant } from '../types';
import { isObject } from '@/utils/data-type';
import { getCallSite } from '../call-site.utils';

const originalLog = console.log.bind(console);
const originalWarn = console.warn.bind(console);
const originalError = console.error.bind(console);
const originalInfo = console.info.bind(console);

function overwriteFunction(_originalFunction: (...args: any[]) => void, type: Variant) {
  return (...args: any[]) => {
    const callSite = getCallSite();

    window.parent.postMessage(
      {
        source: 'runjs-preview',
        payload: args,
        id: crypto.randomUUID(),
        type,
        callSite,
      },
      '*',
    );

    // TODO: Uncomment this when we have a way to run the code locally
    // originalFunction(...args);
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

console.perfLog = overwriteFunction(originalLog, 'perf-log');
console.testLog = overwriteFunction(originalLog, 'test-log');

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
