/**
 * Filters an iterable based on a function.
 *
 * @params iterable - The iterable to filter.
 * @params fn - The function to filter with.
 * @returns The filtered iterable.
 * @see {@link module:iterutil/async/filter.filter} for the asynchronous version.
 * @see {@link module:iterutil/compact.compact} to remove nullish values.
 * @see {@link module:iterutil/compress.compress} to select elements based on a selector iterable.
 * @see {@link module:iterutil/map.map} to transform values.
 * @see {@link module:iterutil/reduce.reduce} to reduce values.
 *
 * @example
 * ```ts
 * import { filter } from "@core/iterutil/filter";
 *
 * const iter = filter([1, 2, 3, 4, 5], (value) => value % 2 === 0);
 * console.log([...iter]); // [2, 4]
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
