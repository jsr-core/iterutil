/**
 * Returns true if at least one element in the iterable satisfies the provided
 *
 * @param iterable The iterable to check.
 * @param fn The function to check with.
 * @returns True if at least one element satisfies the provided function.
 *
 * @example
 * ```ts
 * import { some } from "@core/iterutil/some";
 *
 * console.log(some([1, 2, 3], (value) => value % 2 === 0)); // true
 * console.log(some([1, 3, 5], (value) => value % 2 === 0)); // false
 * ```
 */
export function some<T>(
  iterable: Iterable<T>,
  fn: (value: T) => boolean,
): boolean {
  for (const value of iterable) {
    if (fn(value)) {
      return true;
    }
  }
  return false;
}
