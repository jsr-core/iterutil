/**
 * Maps each value in an iterable to an iterable, then flattens the result.
 *
 * @param iterable The iterable to flat map.
 * @param fn The function to map with.
 * @returns The flat mapped iterable.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { flatMap } from "@core/iterutil/async/flat-map";
 *
 * const iter = flatMap([1, 2, 3], (value) => [value, value]);
 * console.log(await toArray(iter)); // [1, 1, 2, 2, 3, 3]
 * ```
 */
export async function* flatMap<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (
    value: T,
    index: number,
  ) => Iterable<U> | AsyncIterable<U> | Promise<Iterable<U>>,
): AsyncIterable<U> {
  let index = 0;
  for await (const value of iterable) {
    for await (const item of await fn(value, index++)) {
      yield item;
    }
  }
}
