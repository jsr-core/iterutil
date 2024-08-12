/**
 * Maps each value in an iterable to an iterable, then flattens the result.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/map/~/map map} to map values to iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/filter/~/filter filter} to filter values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/flatten/~/flatten flatten} to flatten an iterable of iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/flat-map/~/flatMap flatMap} to flat map an iterable synchronously.
 *
 * @param iterable The iterable to flat map.
 * @param fn The function to map with.
 * @returns The flat mapped iterable.
 *
 * @example
 * ```ts
 * import { flatMap } from "@core/iterutil/async/flat-map";
 *
 * const iter = flatMap(
 *   [1, 2, 3],
 *   (v) => [v, v],
 * );
 * console.log(await Array.fromAsync(iter)); // [1, 1, 2, 2, 3, 3]
 * ```
 */
export async function* flatMap<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (
    value: T,
    index: number,
  ) => Iterable<U> | AsyncIterable<U> | Promise<Iterable<U>>,
): AsyncIterable<U> {
  let index = 0;
  for await (const value of iterable) {
    for await (const item of await fn(value, index++)) {
      yield item;
    }
  }
}
