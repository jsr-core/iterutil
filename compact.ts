/**
 * Removes all nullish ({@codelink null} or {@codelink undefined}) values from an iterable.
 *
 * @param iterable - The iterable to compact.
 * @returns The compacted iterable.
 * @see {@link module:iterutil/async/compact.compact} for the asynchronous version.
 * @see {@link module:iterutil/compress.compress} to select elements based on a selector iterable.
 * @see {@link module:iterutil/filter.filter} to remove values based on a predicate.
 *
 * @example
 * ```ts
 * import { compact } from "@core/iterutil/compact";
 *
 * const iter = compact([1, undefined, 2, null, 3]);
 * console.log([...iter]); // [1, 2, 3]
 * ```
 */
export function* compact<T>(iterable: Iterable<T>): Iterable<NonNullable<T>> {
  for (const value of iterable) {
    if (value != null) {
      yield value;
    }
  }
}
