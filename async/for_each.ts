/**
 * Calls a function for each value in an iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/map/~/map map} to transform values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/filter/~/filter filter} to filter values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/for-each/~/forEach forEach} to iterate synchronously.
 *
 * @param iterable The iterable to iterate over.
 * @param fn The function to call for each value.
 *
 * @example
 * ```ts
 * import { forEach } from "@core/iterutil/async/for-each";
 *
 * await forEach([1, 2, 3], (v) => console.log(v));
 * // 1
 * // 2
 * // 3
 * ```
 */
export async function forEach<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => void | Promise<void>,
): Promise<void> {
  let index = 0;
  for await (const value of iterable) {
    await fn(value, index++);
  }
}
