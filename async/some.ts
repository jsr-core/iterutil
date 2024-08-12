/**
 * Returns true if at least one element in the iterable satisfies the provided
 * function. Otherwise, returns false.
 *
 * The function is called for each element in the iterable until one of them
 * returns true. If the function returns true for any element, this function
 * returns true immediately and does not iterate over the remaining elements.
 *
 * If the iterable is empty, this function returns false.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/every/~/every every} to check if every
 * element satisfies the provided function.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/some/~/some some} to check synchronously.
 *
 * @param iterable The iterable to check.
 * @param fn The function to check with.
 * @returns True if at least one element satisfies the provided function, otherwise false.
 *
 * @example
 * ```ts
 * import { some } from "@core/iterutil/async/some";
 *
 * const result = await some(
 *   [1, 2, 3],
 *   (v) => v % 2 === 0,
 * );
 * console.log(result); // true
 * ```
 */
export async function some<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): Promise<boolean> {
  let index = 0;
  for await (const value of iterable) {
    if (await fn(value, index++)) {
      return true;
    }
  }
  return false;
}
