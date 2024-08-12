/**
 * Flattens an iterable of iterables into a single iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/map/~/map map} to map values to iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/filter/~/filter filter} to filter values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/flat-map/~/flatMap flatMap} to flat map an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/flatten/~/flatten flatten} to flatten an iterable of iterables synchronously.
 *
 * @param iterable The iterable to flatten.
 * @returns The flattened iterable.
 *
 * @example
 * ```ts
 * import { flatten } from "@core/iterutil/async/flatten";
 *
 * const iter = flatten([[1, 2], [3, 4], [5]]);
 * console.log(await Array.fromAsync(iter)); // [1, 2, 3, 4, 5]
 * ```
 */
export async function* flatten<T>(
  iterable:
    | Iterable<Iterable<T> | AsyncIterable<T> | Promise<Iterable<T>>>
    | AsyncIterable<Iterable<T> | AsyncIterable<T> | Promise<Iterable<T>>>,
): AsyncIterable<T> {
  for await (const innerIterable of iterable) {
    yield* innerIterable;
  }
}
