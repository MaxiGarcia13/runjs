const perfNow
  = typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now.bind(performance)
    : Date.now.bind(Date);

const getNow = () => perfNow();

function getHeapUsed() {
  if (typeof performance === 'undefined' || !(performance as any).memory)
    return null;

  const { usedJSHeapSize } = (performance as any).memory;

  return Number.isFinite(usedJSHeapSize) && usedJSHeapSize > 0 ? usedJSHeapSize : null;
}

const isPromiseLike = (value) => typeof value === 'object' && value !== null && typeof value.then === 'function';

interface PerfOptions {
  label?: string;
}

function perf(fn: any, options: PerfOptions = {}, ...args: any[]) {
  const { label = fn?.name || 'anonymous' } = options;

  console.log('=>[perf] Function name: ', label);

  const reportDuration = (startTime) => {
    const durationMs = Math.max(0, getNow() - startTime);

    console.log(`duration: ${durationMs.toFixed(2)}ms`);
  };

  const reportMemory = (startHeapUsed, endHeapUsed) => {
    if (startHeapUsed == null || endHeapUsed == null) {
      console.log('memory usage: unavailable in this browser/runtime');
      return;
    }

    console.log(`memory usage: ${((endHeapUsed - startHeapUsed) / 1024 / 1024).toFixed(2)} MB`);
  };

  const startHeapUsed = getHeapUsed();
  const startTime = getNow();
  const result = fn(...args);

  if (isPromiseLike(result)) {
    return result.finally(() => {
      reportDuration(startTime);

      reportMemory(startHeapUsed, getHeapUsed());
    });
  }

  reportDuration(startTime);
  reportMemory(startHeapUsed, getHeapUsed());

  return result;
};

declare global {
  interface Window {
    perf: typeof perf;
  }
}

window.perf = perf;
