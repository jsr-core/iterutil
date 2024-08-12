/**
 * Flattens an iterable of iterables into a single iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/map map} to map values to iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/filter filter} to filter values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/flat-map flatMap} to flat map an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/flatten flatten} to flatten an iterable of iterables asynchronously.
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
