/**
 * Enumerates an iterable.
 *
 * @param iterable The iterable to enumerate.
 * @param start The starting index.
 * @returns An iterable of index-value pairs.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { enumerate } from "@core/iterutil/async/enumerate";
 *
 * const iter = enumerate(["a", "b", "c"]);
 * console.log(await toArray(iter)); // [[0, "a"], [1, "b"], [2, "c"]]
 * ```
 */
export async function* enumerate<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  start: number = 0,
  step: number = 1,
): AsyncIterable<[number, T]> {
  let i = start;
  for await (const value of iterable) {
    yield [i, value];
    i += step;
  }
}
