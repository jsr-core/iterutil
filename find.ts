/**
 * Returns the first element in the iterable that satisfies the provided
 * testing function. Otherwise, undefined is returned.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/first/~/first first} to get the first element.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/last/~/last last} to get the last element.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/nth/~/nth nth} to get the n-th element.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/filter/~/filter filter} to filter elements.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/find/~/find find} to find elements asynchronously.
 *
 * @param iterable The iterable to search.
 * @param fn The function to test with.
 * @returns The first element that satisfies the provided testing function.
 *
 * @example
 * ```ts
 * import { find } from "@core/iterutil/find";
 *
 * const value = find(
 *   [1, 2, 3, 4, 5],
 *   (v) => v % 2 === 0,
 * );
 * console.log(value); // 2
 * ```
 */
export function find<T>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => boolean,
): T | undefined {
  let index = 0;
  for (const value of iterable) {
    if (fn(value, index++)) {
      return value;
    }
  }
  return undefined;
}
