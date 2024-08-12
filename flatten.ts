/**
 * Flattens an iterable of iterables into a single iterable.
 *
 * @param iterable The iterable to flatten.
 * @returns The flattened iterable.
 *
 * @example
 * ```ts
 * import { flatten } from "@core/iterutil/flatten";
 *
 * const iter = flatten([[1, 2], [3, 4], [5]]);
 * console.log(Array.from(iter)); // [1, 2, 3, 4, 5]
 * ```
 */
export function* flatten<T>(iterable: Iterable<Iterable<T>>): Iterable<T> {
  for (const innerIterable of iterable) {
    yield* innerIterable;
  }
}
