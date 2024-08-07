/**
 * Returns the last element of an iterable.
 *
 * @param iterable The iterable to get the last element of.
 * @returns The last element of the iterable, or `undefined` if the iterable is empty.
 *
 * @example
 * ```ts
 * import { last } from "@core/iterutil/last";
 *
 * console.log(last([1, 2, 3])); // 3
 * console.log(last([])); // undefined
 * ```
 */
export function last<T>(iterable: Iterable<T>): T | undefined {
  let lastValue: T | undefined = undefined;
  for (const value of iterable) {
    lastValue = value;
  }
  return lastValue;
}
