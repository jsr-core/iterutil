/**
 * Returns the first element in the iterable that satisfies the provided
 * testing function. Otherwise, undefined is returned.
 *
 * Use {@link https://jsr.io/@core/iterutil/async/first first} to get the first element.
 * Use {@link https://jsr.io/@core/iterutil/async/last last} to get the last element.
 * Use {@link https://jsr.io/@core/iterutil/async/filter filter} to filter elements.
 * Use {@link https://jsr.io/@core/iterutil/find find} to find elements synchronously.
 *
 * @param iterable The iterable to search.
 * @param fn The function to test with.
 * @returns The first element that satisfies the provided testing function.
 *
 * @example
 * ```ts
 * import { find } from "@core/iterutil/async/find";
 *
 * const value = await find(
 *   [1, 2, 3, 4, 5],
 *   (v) => v % 2 === 0,
 * );
 * console.log(value); // 2
 * ```
 */
export async function find<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): Promise<T | undefined> {
  let index = 0;
  for await (const value of iterable) {
    if (await fn(value, index++)) {
      return value;
    }
  }
  return undefined;
}
