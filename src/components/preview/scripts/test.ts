import { deepEqual } from '@maxigarcia/js-utils';

function expect(value: any) {
  async function getValue() {
    if (typeof value === 'function') {
      return await value();
    }

    return value;
  }

  function formatValue(value: any) {
    return JSON.stringify(value, null, 2);
  }

  async function toBe(expected: boolean | number | string | null | undefined) {
    const result = await getValue();
    const isPassed = result === expected;

    if (isPassed) {
      console.log(`✅ expect ${formatValue(result)} to be ${formatValue(expected)}`);
    } else {
      console.warn(`❌ expect ${formatValue(result)} to be ${formatValue(expected)}`);
    }
  }

  async function toEqual(expected: boolean | number | string | null | undefined | object | Array<any>) {
    const result = await getValue();
    const isPassed = deepEqual(result, expected);

    if (isPassed) {
      console.log(`✅ expect ${formatValue(result)} to equal ${formatValue(expected)}`);
    } else {
      console.warn(`❌ expect ${formatValue(result)} to equal ${formatValue(expected)}`);
    }
  }

  return {
    toBe,
    toEqual,
  };
}

declare global {
  interface Window {
    expect: typeof expect;
  }
}

window.expect = expect;
