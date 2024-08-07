/**
 * Converts an iterable or async iterable to an array.
 *
 * @param iterable The iterable or async iterable to convert.
 * @returns The array.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 *
 * const arr1 = await toArray(function*() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * }());
 * console.log(arr1); // [1, 2, 3]
 *
 * const arr2 = await toArray(async function*() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * }());
 * console.log(arr2); // [1, 2, 3]
 * ```
 */
export async function toArray<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Promise<T[]> {
  const result: T[] = [];
  for await (const value of iterable) {
    result.push(value);
  }
  return result;
}
