/**
 * Filters an iterable based on a function.
 *
 * @params iterable The iterable to filter.
 * @params fn The function to filter with.
 * @returns The filtered iterable.
 *
 * @example
 * ```ts
 * import { filter } from "@core/iterutil/filter";
 *
 * const iter = filter([1, 2, 3, 4, 5], (value) => value % 2 === 0);
 * console.log(Array.from(iter)); // [2, 4]
 * ```
 */
export function* filter<T>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => boolean,
): Iterable<T> {
  let index = 0;
  for (const value of iterable) {
    if (fn(value, index++)) {
      yield value;
    }
  }
}
