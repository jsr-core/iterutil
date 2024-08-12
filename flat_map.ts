/**
 * Maps each value in an iterable to an iterable, then flattens the result.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/map map} to map values to iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/filter filter} to filter values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/flatten flatten} to flatten an iterable of iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/flat-map flatMap} to flat map an iterable asynchronously.
 *
 * @param iterable The iterable to flat map.
 * @param fn The function to map with.
 * @returns The flat mapped iterable.
 *
 * @example
 * ```ts
 * import { flatMap } from "@core/iterutil/flat-map";
 *
 * const iter = flatMap(
 *   [1, 2, 3],
 *   (v) => [v, v],
 * );
 * console.log(Array.from(iter)); // [1, 1, 2, 2, 3, 3]
 * ```
 */
export function* flatMap<T, U>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => Iterable<U>,
): Iterable<U> {
  let index = 0;
  for (const value of iterable) {
    yield* fn(value, index++);
  }
}
