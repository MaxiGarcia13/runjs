import { deepEqual } from '@maxigarcia/js-utils';
import { isObject, isPrimitive, isRegExp, isString } from '@/utils/data-type';
import { getCallSite } from '../../call-site.utils';
import { expectSpy } from './spy';
import { formatValue, getValue } from './utils';

export function expect<T>(value: T) {
  const callSite = (() => {
    return getCallSite?.();
  })();

  async function toBe(expected: boolean | number | string | null | undefined): Promise<void> {
    const result = await getValue(value);

    if (!isPrimitive(result)) {
      console.testLog(callSite, false, `Received value must be a primitive, but got ${typeof result}`);
      return;
    }

    if (!isPrimitive(expected)) {
      console.testLog(callSite, false, `Expected value must be a primitive, but got ${typeof expected}`);
      return;
    }

    const isPassed = result === expected;

    console.testLog(callSite, isPassed, formatValue(expected), formatValue(result));
  }

  async function toEqual(expected: boolean | number | string | null | undefined | object | Array<unknown>) {
    const result = await getValue(value);
    const isPassed = deepEqual(result, expected);

    console.testLog(callSite, isPassed, formatValue(expected), formatValue(result));
  }

  async function stringMatching(expected: string | RegExp) {
    const result = await getValue(value);

    if (!isString(result)) {
      console.testLog(callSite, false, `Received value must be a string, but got ${typeof result}`);
      return;
    }

    if (!isString(expected) && !isRegExp(expected)) {
      console.testLog(callSite, false, `Expected value must be a string or RegExp, but got ${typeof expected}`);
      return;
    }

    const resultString = result.toString();
    const isPassed
      = typeof expected === 'string'
        ? resultString.includes(expected)
        : expected.test(resultString);

    console.testLog(callSite, isPassed, formatValue(expected), formatValue(result));
  }

  async function objectContaining(expected: object) {
    const result = await getValue(value);

    if (!isObject(result)) {
      console.testLog(callSite, false, `Received value must be an object, but got ${typeof result}`);
      return;
    }

    if (!isObject(expected)) {
      console.testLog(callSite, false, `Expected value must be an object, but got ${typeof expected}`);
      return;
    }

    const expectedKeys = Object.keys(expected);
    const isPassed = expectedKeys.every((key) => {
      const typedResult = result as Record<string, unknown>;
      const typedExpected = expected as Record<string, unknown>;
      return key in typedResult && deepEqual(typedResult[key], typedExpected[key]);
    });

    console.testLog(callSite, isPassed, formatValue(expected), formatValue(result));
  }

  async function arrayContaining(expected: Array<unknown>) {
    const result = await getValue(value);

    if (!Array.isArray(result)) {
      console.testLog(callSite, false, `Received value must be an array, but got ${typeof result}`);
      return;
    }

    if (!Array.isArray(expected)) {
      console.testLog(callSite, false, `Expected value must be an array, but got ${typeof expected}`);
      return;
    }

    const isPassed = expected.every((expectedItem) =>
      result.some((resultItem) => deepEqual(resultItem, expectedItem)),
    );

    console.testLog(callSite, isPassed, formatValue(expected), formatValue(result));
  }

  return {
    ...expectSpy(value, callSite),
    toBe,
    toEqual,
    stringMatching,
    objectContaining,
    arrayContaining,
  };
}
