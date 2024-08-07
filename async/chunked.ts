/**
 * Chunks an iterable into arrays of a given size.
 *
 * @param iterable The iterable to chunk.
 * @param size The size of each chunk.
 * @returns The chunked iterable.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { chunked } from "@core/iterutil/async/chunked";
 *
 * const iter = chunked([1, 2, 3, 4, 5], 2);
 * console.log(await toArray(iter)); // [[1, 2], [3, 4], [5]]
 * ```
 */
export async function* chunked<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  size: number,
): AsyncIterable<T[]> {
  let chunk = [];
  for await (const item of iterable) {
    chunk.push(item);
    if (chunk.length === size) {
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length > 0) {
    yield chunk;
  }
}
