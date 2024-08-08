/**
 * Returns the first element in the iterable that satisfies the provided testing function.
 * Otherwise, undefined is returned.
 *
 * @param iterable - The iterable to search.
 * @param fn - The function to test with.
 * @returns The first element that satisfies the provided testing function or undefined.
 * @see {@link module:iterutil/async/find.find} for the asynchronous version.
 * @see {@link module:iterutil/first.first} to get the first element of an iterable.
 * @see {@link module:iterutil/last.last} to get the last element of an iterable.
 *
 * @example
 * ```ts
 * import { find } from "@core/iterutil/find";
 *
 * const value = find([1, 2, 3, 4, 5], (value) => value % 2 === 0);
 * console.log(value); // 2
 * ```
 */
export function find<T>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => boolean,
): T | undefined {
  let index = 0;
  for (const value of iterable) {
    if (fn(value, index++)) {
      return value;
    }
  }
  return undefined;
}
