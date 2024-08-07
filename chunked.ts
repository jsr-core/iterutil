/**
 * Chunks an iterable into arrays of a given size.
 *
 * @param iterable The iterable to chunk.
 * @param size The size of each chunk.
 * @returns The chunked iterable.
 *
 * @example
 * ```ts
 * import { chunked } from "@core/iterutil/chunked";
 *
 * const iter = chunked([1, 2, 3, 4, 5], 2);
 * console.log([...iter]); // [[1, 2], [3, 4], [5]]
 * ```
 */
export function* chunked<T>(
  iterable: Iterable<T>,
  size: number,
): Iterable<T[]> {
  let chunk = [];
  for (const item of iterable) {
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
