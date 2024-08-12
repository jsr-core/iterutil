/**
 * Returns the last element of an iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/first first} to get the first element.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/find find} to find an element.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/last last} to get the last element asynchronously.
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
