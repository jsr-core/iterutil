/**
 * Filters an iterable based on a function.
 *
 * @params iterable The iterable to filter.
 * @params fn The function to filter with.
 * @returns The filtered iterable.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { filter } from "@core/iterutil/async/filter";
 *
 * const iter = filter([1, 2, 3, 4, 5], (value) => value % 2 === 0);
 * console.log(await toArray(iter)); // [2, 4]
 * ```
 */
export async function* filter<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): AsyncIterable<T> {
  let index = 0;
  for await (const value of iterable) {
    if (await fn(value, index++)) {
      yield value;
    }
  }
}
