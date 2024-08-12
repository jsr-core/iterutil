/**
 * Removes all nullish (`null` or `undefined`) values from an iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/compress/~/compress compress} to remove values based on an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/filter/~/filter filter} to remove values based on a function.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/compact/~/compact compact} to compact iterables asynchronously.
 *
 * @param iterable The iterable to compact.
 * @returns The compacted iterable.
 *
 * @example
 * ```ts
 * import { compact } from "@core/iterutil/compact";
 *
 * const iter = compact([1, undefined, 2, null, 3]);
 * console.log(Array.from(iter)); // [1, 2, 3]
 * ```
 */
export function* compact<T>(iterable: Iterable<T>): Iterable<NonNullable<T>> {
  for (const value of iterable) {
    if (value != null) {
      yield value;
    }
  }
}
