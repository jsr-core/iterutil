/**
 * Chunks the iterable into the iterable of arrays of `size`.
 *
 * The last chunk may have less than `size` elements.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/flatten/~/flatten flatten} to flatten the chunks.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/chunked/~/chunked chunked} to chunk iterables asynchronously.
 *
 * @param iterable The iterable to chunk.
 * @param size The size of each chunk.
 * @returns The chunked iterable.
 * @throws {RangeError} if `size` is not a positive safe integer.
 *
 * @example
 * ```ts
 * import { chunked } from "@core/iterutil/chunked";
 *
 * const iter = chunked(
 *   [1, 2, 3, 4, 5],
 *   2,
 * );
 * console.log(Array.from(iter)); // [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunked<T>(
  iterable: Iterable<T>,
  size: number,
): Iterable<T[]> {
  if (size <= 0 || !Number.isSafeInteger(size)) {
    throw new RangeError(
      `size must be a positive safe integer, but got ${size}.`,
    );
  }
  return function* () {
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
  }();
}
