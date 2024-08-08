/**
 * Enumerate an iterable.
 *
 * @param iterable - The iterable to enumerate.
 * @param start - The starting index.
 * @returns An iterable of index-value pairs.
 * @see {@link module:iterutil/async/enumerate.enumerate} for the asynchronous version.
 * @see {@link module:iterutil/zipped.zipped} to zip multiple iterables together.
 * @see {@link module:iterutil/count.count} to generate an infinite sequence of numbers.
 * @see {@link module:iterutil/range.range} to generate a finite sequence of numbers.
 *
 * @example
 * ```ts
 * import { enumerate } from "@core/iterutil/enumerate";
 *
 * const iter = enumerate(["a", "b", "c"]);
 * console.log([...iter]); // [[0, "a"], [1, "b"], [2, "c"]]
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
