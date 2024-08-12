/**
 * Flattens an iterable of iterables into a single iterable.
 *
 * @param iterable The iterable to flatten.
 * @returns The flattened iterable.
 *
 * @example
 * ```ts
 * import { flatten } from "@core/iterutil/async/flatten";
 *
 * const iter = flatten([[1, 2], [3, 4], [5]]);
 * console.log(await Array.fromAsync(iter)); // [1, 2, 3, 4, 5]
 * ```
 */
export async function* flatten<T>(
  iterable:
    | Iterable<Iterable<T> | AsyncIterable<T> | Promise<Iterable<T>>>
    | AsyncIterable<Iterable<T> | AsyncIterable<T> | Promise<Iterable<T>>>,
): AsyncIterable<T> {
  for await (const innerIterable of iterable) {
    for await (const value of innerIterable) {
      yield value;
    }
  }
}
