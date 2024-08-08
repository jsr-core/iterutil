/**
 * Calls a function for each value in an iterable.
 *
 * @param iterable The iterable to iterate over.
 * @param fn The function to call for each value.
 *
 * @example
 * ```ts
 * import { forEach } from "@core/iterutil/for-each";
 *
 * forEach([1, 2, 3], console.log);
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
