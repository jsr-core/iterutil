/**
 * Returns true if every element in the iterable satisfies the provided testing function.
 *
 * @param iterable The iterable to test.
 * @param fn The function to test with.
 * @returns True if every element in the iterable satisfies the provided testing function, otherwise false.
 *
 * @example
 * ```ts
 * import { every } from "@core/iterutil/every";
 *
 * console.log(every([1, 2, 3], (value) => value > 0)); // true
 * console.log(every([1, 2, 3], (value) => value > 1)); // false
 * ```
 */
export function every<T>(
  iterable: Iterable<T>,
  fn: (value: T) => boolean,
): boolean {
  for (const value of iterable) {
    if (!fn(value)) {
      return false;
    }
  }
  return true;
}
