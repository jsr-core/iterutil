/**
 * Maps an iterable with a function.
 *
 * @param iterable The iterable to map.
 * @param fn The function to map with.
 * @returns The mapped iterable.
 *
 * @example
 * ```ts
 * import { map } from "@core/iterutil/async/map";
 *
 * const iter = map([1, 2, 3], (value) => value * 2);
 * console.log(await Array.fromAsync(iter)); // [2, 4, 6]
 * ```
 */
export async function* map<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => U | Promise<U>,
): AsyncIterable<U> {
  let index = 0;
  for await (const value of iterable) {
    yield await fn(value, index++);
  }
}
