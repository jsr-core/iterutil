/**
 * Converts an iterable to an array.
 *
 * Note that users should use `Array.from` directly. This function exists for consistency with `async/to-array.toArray`.
 *
 * @param iterable The iterable to convert.
 * @returns The array.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/to-array";
 *
 * const arr = toArray(function*() {
 *   yield 1;
 *   yield 2;
 *   yield 3;
 * }());
 * console.log(arr); // [1, 2, 3]
 * ```
 */
export function toArray<T>(
  iterable: Iterable<T>,
): T[] {
  return Array.from(iterable);
}
