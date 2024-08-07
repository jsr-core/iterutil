/**
 * Returns true if at least one element in the iterable satisfies the provided
 *
 * @param iterable The iterable to check.
 * @param fn The function to check with.
 * @returns True if at least one element satisfies the provided function.
 *
 * @example
 * ```ts
 * import { some } from "@core/iterutil/async/some";
 *
 * console.log(await some([1, 2, 3], (value) => value % 2 === 0)); // true
 * console.log(await some([1, 3, 5], (value) => value % 2 === 0)); // false
 * ```
 */
export async function some<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T) => boolean | Promise<boolean>,
): Promise<boolean> {
  for await (const value of iterable) {
    if (await fn(value)) {
      return true;
    }
  }
  return false;
}
