import type { Variant } from '../types';
import type { CallSite } from '../utils/call-site';
import { isObject, isThenable } from '@/utils/data-type';
import { getCallSite } from '../utils/call-site';
import {
  buildLogPayload,
  createLogPayloadState,
  subscribeToThenables,
} from '../utils/serialize-log-args';

const originalLog = console.log.bind(console);
const originalWarn = console.warn.bind(console);
const originalError = console.error.bind(console);
const originalInfo = console.info.bind(console);
const originalTable = console.table.bind(console);

function postLogMessage(
  payload: unknown[],
  id: string,
  type: Variant,
  callSite: CallSite | null,
) {
  window.parent.postMessage(
    {
      source: 'runjs-preview',
      payload,
      id,
      type,
      callSite,
    },
    '*',
  );
}

function overwriteFunction(_originalFunction: (...args: any[]) => void, type: Variant) {
  return (...args: any[]) => {
    const callSite = getCallSite();
    const id = crypto.randomUUID();
    const { values, states } = createLogPayloadState(args);

    const publish = () => {
      postLogMessage(buildLogPayload(args, values, states), id, type, callSite);
    };

    publish();
    subscribeToThenables(args, values, states, publish);

    // TODO: Uncomment this when we have a way to run the code locally
    // originalFunction(...args);
  };
}

console.log = overwriteFunction(originalLog, 'log');
console.warn = overwriteFunction(originalWarn, 'warn');
console.error = overwriteFunction(originalError, 'error');
console.info = overwriteFunction(originalInfo, 'info');
console.table = overwriteFunction(originalTable, 'log-table');

declare global {
  interface Console {
    perfLog: (...args: any[]) => void;
    testLog: (...args: any[]) => void;
  }
}

console.perfLog = overwriteFunction(originalLog, 'perf-log');
console.testLog = overwriteFunction(originalLog, 'test-log');
console.table = overwriteFunction(originalTable, 'log-table');

declare global {
  interface Window {
    log: typeof console.log;
    warn: typeof console.warn;
    error: typeof console.error;
    info: typeof console.info;
    logTable: typeof console.table;
    reportResult: (value: unknown) => void;
  }
}

function reportResult(value: unknown) {
  if (value === undefined)
    return;

  const callSite = getCallSite();
  const id = crypto.randomUUID();

  // Async matchers (e.g. expect(...).toBe()) return a Promise<void>.
  // Don't surface "pending" — wait until settled, and skip void fulfillments.
  if (isThenable(value)) {
    const { values, states } = createLogPayloadState([value]);

    subscribeToThenables([value], values, states, () => {
      const state = states[0];
      if (state === 'pending')
        return;
      if (state === 'fulfilled' && values[0] === undefined)
        return;

      postLogMessage(buildLogPayload([value], values, states), id, 'log', callSite);
    });
    return;
  }

  const { values, states } = createLogPayloadState([value]);
  postLogMessage(buildLogPayload([value], values, states), id, 'log', callSite);
}

if (isObject(window)) {
  window.log = overwriteFunction(originalLog, 'log');
  window.warn = overwriteFunction(originalWarn, 'warn');
  window.error = overwriteFunction(originalError, 'error');
  window.info = overwriteFunction(originalInfo, 'info');
  window.logTable = overwriteFunction(originalTable, 'log-table');
  window.reportResult = reportResult;
}
