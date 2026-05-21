import { isThenable } from '@/utils/data-type';

export const PROMISE_PENDING = 'Promise { <pending> }';

function formatRejectedReason(reason: unknown): string {
  if (reason instanceof Error)
    return reason.message;

  return String(reason);
}

export function serializeLogArg(value: unknown): unknown {
  if (isThenable(value))
    return PROMISE_PENDING;

  if (typeof value === 'function') {
    const name = value.name;
    return name ? `[Function: ${name}]` : '[Function]';
  }

  if (typeof value === 'symbol')
    return value.toString();

  if (typeof value === 'bigint')
    return `${value.toString()}n`;

  try {
    structuredClone(value);
    return value;
  } catch {
    try {
      return JSON.parse(JSON.stringify(value)) as unknown;
    } catch {
      return String(value);
    }
  }
}

type ArgState = 'sync' | 'pending' | 'fulfilled' | 'rejected';

export function buildLogPayload(
  args: unknown[],
  values: unknown[],
  states: ArgState[],
): unknown[] {
  return args.map((arg, index) => {
    const state = states[index];

    if (isThenable(arg) && state === 'pending')
      return PROMISE_PENDING;

    if (isThenable(arg) && state === 'rejected')
      return `Promise { <rejected> ${formatRejectedReason(values[index])} }`;

    return serializeLogArg(values[index] ?? arg);
  });
}

export function createLogPayloadState(args: unknown[]) {
  const values: unknown[] = [];
  const states: ArgState[] = [];

  for (const arg of args) {
    if (isThenable(arg)) {
      values.push(undefined);
      states.push('pending');
      continue;
    }

    values.push(arg);
    states.push('sync');
  }

  return { values, states };
}

export function subscribeToThenables(
  args: unknown[],
  values: unknown[],
  states: ArgState[],
  onUpdate: () => void,
) {
  args.forEach((arg, index) => {
    if (!isThenable(arg))
      return;

    Promise.resolve(arg).then(
      (resolved) => {
        values[index] = resolved;
        states[index] = 'fulfilled';
        onUpdate();
      },
      (reason) => {
        values[index] = reason;
        states[index] = 'rejected';
        onUpdate();
      },
    );
  });
}
