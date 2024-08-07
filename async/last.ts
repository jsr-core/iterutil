/**
 * Returns the last element of an iterable.
 *
 * @param iterable The iterable to get the last element of.
 * @returns The last element of the iterable, or `undefined` if the iterable is empty.
 *
 * @example
 * ```ts
 * import { last } from "@core/iterutil/async/last";
 *
 * console.log(await last([1, 2, 3])); // 3
 * console.log(await last([])); // undefined
 * ```
 */
export async function last<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Promise<T | undefined> {
  let lastValue: T | undefined = undefined;
  for await (const value of iterable) {
    lastValue = value;
  }
  return lastValue;
}
