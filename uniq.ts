/**
 * Returns an iterable that yields the unique elements of the input iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/async/uniq uniq} to get the unique elements asynchronously.
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
 * console.log(Array.from(iter)); // [1, 2, 3]
 * ```
 *
 * @example With identify function
 * ```ts
 * import { uniq } from "@core/iterutil/uniq";
 *
 * const iter = uniq(
 *   [1, 2, 3, 4, 5, 6, 7, 8, 9],
 *   (v) => v % 4,
 * );
 * console.log(Array.from(iter)); // [1, 2, 3, 4]
 * ```
 */
export function* uniq<T>(
  iterable: Iterable<T>,
  identify: (value: T, index: number) => unknown = (v) => v,
): Iterable<T> {
  const set = new Set<unknown>();
  let index = 0;
  for (const item of iterable) {
    const id = identify(item, index++);
    if (!set.has(id)) {
      set.add(id);
      yield item;
    }
  }
}
