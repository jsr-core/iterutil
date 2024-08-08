/**
 * Removes all nullish (`null` or `undefined`) values from an iterable.
 *
 * @param iterable The iterable to compact.
 * @returns The compacted iterable.
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
