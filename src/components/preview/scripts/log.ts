const originalLog = console.log.bind(console);
const originalWarn = console.warn.bind(console);
const originalError = console.error.bind(console);
const originalInfo = console.info.bind(console);

function overwriteFunction(originalFunction, type) {
  return (...args) => {
    window.parent.postMessage(
      {
        source: 'runjs-preview',
        payload: args,
        id: Math.random().toString(36).substring(2, 15),
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
  interface Window {
    log: typeof console.log;
    warn: typeof console.warn;
    error: typeof console.error;
    info: typeof console.info;
  }
}

if (typeof window === 'object') {
  window.log = overwriteFunction(originalLog, 'log');
  window.warn = overwriteFunction(originalWarn, 'warn');
  window.error = overwriteFunction(originalError, 'error');
  window.info = overwriteFunction(originalInfo, 'info');
}
