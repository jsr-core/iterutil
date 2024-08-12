/**
 * Maps an iterable with a function.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/filter filter} to filter values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/for-each forEach} to call a function for each value.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/flat-map flatMap} to map and flatten the result.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/flatten flatten} to flatten an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/map map} to map asynchronously.
 *
 * @param iterable The iterable to map.
 * @param fn The function to map with.
 * @returns The mapped iterable.
 *
 * @example
 * ```ts
 * import { map } from "@core/iterutil/map";
 *
 * const iter = map(
 *   [1, 2, 3],
 *   (v) => v * 2,
 * );
 * console.log(Array.from(iter)); // [2, 4, 6]
 * ```
 */
export function* map<T, U>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => U,
): Iterable<U> {
  let index = 0;
  for (const value of iterable) {
    yield fn(value, index++);
  }
}
