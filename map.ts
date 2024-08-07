/**
 * Maps an iterable with a function.
 *
 * @param iterable The iterable to map.
 * @param fn The function to map with.
 * @returns The mapped iterable.
 *
 * @example
 * ```ts
 * import { map } from "@core/iterutil/map";
 *
 * const iter = map([1, 2, 3], (value) => value * 2);
 * console.log([...iter]); // [2, 4, 6]
 * ```
 */
export function* map<T, U>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => U,
): Iterable<U> {
  let index = 0;
  for (const value of iterable) {
    yield fn(value, index++);
  }
}
