/**
 * Enumerates an iterable.
 *
 * @param iterable The iterable to enumerate.
 * @param start The starting index.
 * @returns An iterable of index-value pairs.
 *
 * @example
 * ```ts
 * import { enumerate } from "@core/iterutil/enumerate";
 *
 * const iter = enumerate(["a", "b", "c"]);
 * console.log(Array.from(iter)); // [[0, "a"], [1, "b"], [2, "c"]]
 * ```
 */
export function* enumerate<T>(
  iterable: Iterable<T>,
  start: number = 0,
  step: number = 1,
): Iterable<[number, T]> {
  let i = start;
  for (const value of iterable) {
    yield [i, value];
    i += step;
  }
}
