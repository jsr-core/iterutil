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
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/some/~/some some} to check if any element satisfies the function.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/every/~/every every} to check asynchronously.
 *
 * @param iterable The iterable to check.
 * @param fn The function to check with.
 * @returns True if every element in the iterable satisfies the provided testing function, otherwise false.
 *
 * @example
 * ```ts
 * import { every } from "@core/iterutil/every";
 *
 * const result = every(
 *   [1, 2, 3],
 *   (v) => v > 0
 * );
 * console.log(result); // true
 * ```
 */
export function every<T>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => boolean,
): boolean {
  let index = 0;
  for (const value of iterable) {
    if (!fn(value, index++)) {
      return false;
    }
  }
  return true;
}
