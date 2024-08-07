/**
 * Calls a function for each value in an iterable.
 *
 * @param iterable The iterable to iterate over.
 * @param fn The function to call for each value.
 *
 * @example
 * ```ts
 * import { forEach } from "@core/iterutil/async/for-each";
 * await forEach([1, 2, 3], console.log);
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
