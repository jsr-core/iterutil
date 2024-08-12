/**
 * Maps an iterable with a function.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/filter filter} to filter values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/for-each forEach} to call a function for each value.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/flat-map flatMap} to flat map an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/flatten flatten} to flatten an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/map map} to map synchronously.
 *
 * @param iterable The iterable to map.
 * @param fn The function to map with.
 * @returns The mapped iterable.
 *
 * @example
 * ```ts
 * import { map } from "@core/iterutil/async/map";
 *
 * const iter = map(
 *   [1, 2, 3],
 *   (v) => v * 2,
 * );
 * console.log(await Array.fromAsync(iter)); // [2, 4, 6]
 * ```
 */
export async function* map<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => U | Promise<U>,
): AsyncIterable<U> {
  let index = 0;
  for await (const value of iterable) {
    yield await fn(value, index++);
  }
}
