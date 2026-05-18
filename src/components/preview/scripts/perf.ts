import { isThenable } from '@/utils/data-type';

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

interface PerfOptions {
  label?: string;
}

function perf(fn: any, options: PerfOptions = {}, ...args: any[]) {
  const { label = fn?.name || 'anonymous' } = options;

  const reportDuration = (startTime: number) => {
    const durationMs = Math.max(0, getNow() - startTime);

    return `Duration: ${durationMs.toFixed(2)}ms`;
  };

  const reportMemory = (startHeapUsed: number | null, endHeapUsed: number | null) => {
    if (startHeapUsed == null || endHeapUsed == null) {
      console.perfLog('memory usage: unavailable in this browser/runtime');
      return;
    }

    return `Memory usage: ${((endHeapUsed - startHeapUsed) / 1024 / 1024).toFixed(2)} MB`;
  };

  const startHeapUsed = getHeapUsed();
  const startTime = getNow();
  const result = fn(...args);

  if (isThenable(result)) {
    return result.finally(() => {
      console.perfLog(`Function name: ${label} \n${reportDuration(startTime)} \n${reportMemory(startHeapUsed, getHeapUsed())}`);
    });
  }

  console.perfLog(`Function name: ${label} \n${reportDuration(startTime)}\n${reportMemory(startHeapUsed, getHeapUsed())}`);

  return result;
};

declare global {
  interface Window {
    perf: typeof perf;
  }
}

window.perf = perf;
