/**
 * Returns true if every element in the iterable satisfies the provided function.
 * Otherwise, returns false.
 *
 * The function is called for each element in the iterable until one of them
 * returns false. If the function returns false for any element, this function
 * returns false immediately and does not iterate over the remaining elements.
 *
 * If the iterable is empty, this function returns true.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/async/some some} to check if any element satisfies the function.
 * Use {@linkcode https://jsr.io/@core/iterutil/every every} to check synchronously.
 *
 * @param iterable The iterable to test.
 * @param fn The function to test with.
 * @returns True if every element in the iterable satisfies the provided testing function, otherwise false.
 *
 * @example
 * ```ts
 * import { every } from "@core/iterutil/async/every";
 *
 * const result = await every(
 *   [1, 2, 3],
 *   (v) => v > 0,
 * );
 * console.log(result); // true
 * ```
 */
export async function every<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): Promise<boolean> {
  let index = 0;
  for await (const value of iterable) {
    if (!await fn(value, index++)) {
      return false;
    }
  }
  return true;
}
