/**
 * Returns true if every element in the iterable satisfies the provided testing function.
 *
 * @param iterable The iterable to test.
 * @param fn The function to test with.
 * @returns True if every element in the iterable satisfies the provided testing function, otherwise false.
 *
 * @example
 * ```ts
 * import { every } from "@core/iterutil/async/every";
 *
 * console.log(await every([1, 2, 3], (value) => value > 0)); // true
 * console.log(await every([1, 2, 3], (value) => value > 1)); // false
 * ```
 */
export async function every<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T) => boolean | Promise<boolean>,
): Promise<boolean> {
  for await (const value of iterable) {
    if (!await fn(value)) {
      return false;
    }
  }
  return true;
}
