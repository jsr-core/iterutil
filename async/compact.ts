/**
 * Removes all nullish values from an iterable.
 *
 * @param iterable The iterable to compact.
 * @returns The compacted iterable.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { compact } from "@core/iterutil/async/compact";
 *
 * const iter = compact([1, undefined, 2, null, 3]);
 * console.log(await toArray(iter)); // [1, 2, 3]
 * ```
 */
export async function* compact<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): AsyncIterable<NonNullable<T>> {
  for await (const value of iterable) {
    if (value != null) {
      yield value;
    }
  }
}
