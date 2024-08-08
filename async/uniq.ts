/**
 * Returns an iterable that yields the unique elements of the input iterable.
 *
 * @param iterable The iterable to get the unique elements of.
 * @param identify An optional function to transform the elements before checking for uniqueness.
 * @returns An iterable that yields the unique elements of the input iterable.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { uniq } from "@core/iterutil/async/uniq";
 *
 * const iter = uniq([1, 2, 2, 3, 3, 3]);
 * console.log(await toArray(iter)); // [1, 2, 3]
 * ```
 *
 * @example With identify function
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { uniq } from "@core/iterutil/async/uniq";
 *
 * const iter = uniq(
 *   [1, 2, 3, 1, 2, 3, 10, 20, 30, 11, 21, 31],
 *   (v) => Math.floor(v / 10),
 * );
 * console.log(await toArray(iter)); // [1, 10, 20, 30]
 * ```
 */
export async function* uniq<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  identify: (v: T) => unknown | Promise<unknown> = (v) => v,
): AsyncIterable<T> {
  const set = new Set<unknown>();
  for await (const item of iterable) {
    const identity = await identify(item);
    if (!set.has(identity)) {
      set.add(identity);
      yield item;
    }
  }
}
