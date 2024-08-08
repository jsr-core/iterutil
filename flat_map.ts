/**
 * Maps each value in an iterable to an iterable, then flattens the result.
 *
 * @param iterable - The iterable to flat map.
 * @param fn - The function to map with.
 * @returns The flat mapped iterable.
 *
 * @example
 * ```ts
 * import { flatMap } from "@core/iterutil/flat-map";
 *
 * const iter = flatMap([1, 2, 3], (value) => [value, value]);
 * console.log([...iter]); // [1, 1, 2, 2, 3, 3]
 * ```
 */
export function* flatMap<T, U>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => Iterable<U>,
): Iterable<U> {
  let index = 0;
  for (const value of iterable) {
    yield* fn(value, index++);
  }
}
