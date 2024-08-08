/**
 * Removes all nullish (`null` or `undefined`) values from an iterable.
 *
 * @param iterable - The iterable to compact.
 * @returns The compacted iterable.
 *
 * @example
 * ```ts
 * import { compact } from "@core/iterutil/compact";
 *
 * const iter = compact([1, undefined, 2, null, 3]);
 * console.log([...iter]); // [1, 2, 3]
 * ```
 *
 * ## See also
 * - {@link module:@core/iterutil/async/compact.compact} for the asynchronous version.
 * - {@link module:/compress.compress} to select elements based on a selector iterable.
 * - {@link module:filter.filter} to remove values based on a predicate.
 */
export function* compact<T>(iterable: Iterable<T>): Iterable<NonNullable<T>> {
  for (const value of iterable) {
    if (value != null) {
      yield value;
    }
  }
}
