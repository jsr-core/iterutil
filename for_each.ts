/**
 * Calls a function for each value in an iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/map map} to transform values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/filter filter} to filter values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/for-each forEach} to iterate asynchronously.
 *
 * @param iterable The iterable to iterate over.
 * @param fn The function to call for each value.
 *
 * @example
 * ```ts
 * import { forEach } from "@core/iterutil/for-each";
 *
 * forEach([1, 2, 3], (v) => console.log(v));
 * // 1
 * // 2
 * // 3
 * ```
 */
export function forEach<T>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => void,
): void {
  let index = 0;
  for (const value of iterable) {
    fn(value, index++);
  }
}
