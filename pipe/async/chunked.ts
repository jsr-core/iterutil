import { chunked as base } from "../../async/chunked.ts";

/**
 * Returns an operator that chunks the iterable into arrays of `size`.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/chunked/~/chunked chunked} for native chunked.
 *
 * @param size The size of each chunk.
 * @return An operator that chunks the iterable into arrays of `size`.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { chunked } from "@core/iterutil/pipe/async/chunked";
 *
 * const iter = pipe(
 *   [1, 2, 3, 4, 5],
 *   chunked(2),
 * );
 * console.log(await Array.fromAsync(iter)); // [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunked(
  size: number,
): <T>(iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T[]> {
  return (iterable) => base(iterable, size);
}
