/**
 * Returns an iterable that yields the unique elements of the input iterable.
 *
 * @param iterable The iterable to get the unique elements of.
 * @param identify An optional function to transform the elements before checking for uniqueness.
 * @returns An iterable that yields the unique elements of the input iterable.
 *
 * @example
 * ```ts
 * import { uniq } from "@core/iterutil/uniq";
 *
 * const iter = uniq([1, 2, 2, 3, 3, 3]);
 * console.log([...iter]); // [1, 2, 3]
 * ```
 *
 * @example
 * ```ts
 * import { uniq } from "@core/iterutil/uniq";
 *
 * const iter = uniq(
 *   [1, 2, 3, 1, 2, 3, 10, 20, 30, 11, 21, 31],
 *   (v) => Math.floor(v / 10),
 * );
 * console.log([...iter]); // [1, 10, 20, 30]
 * ```
 */
export function* uniq<T>(
  iterable: Iterable<T>,
  identify: (v: T) => unknown = (v) => v,
): Iterable<T> {
  const set = new Set<unknown>();
  for (const item of iterable) {
    const identity = identify(item);
    if (!set.has(identity)) {
      set.add(identity);
      yield item;
    }
  }
}
