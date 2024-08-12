import { drop as base } from "@core/iterutil/async/drop";

/**
 * Returns an operator that drops the first `limit` items from the iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/drop/~/drop drop} for native drop.
 *
 * @param limit The number of items to drop. It must be 0 or positive safe integer.
 * @returns An operator that drops the first `limit` items from the iterable.
 * @throws {RangeError} if `limit` is less than 0 or non safe integer.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { drop } from "@core/iterutil/pipe/async/drop";
 *
 * const iter = pipe(
 *   [1, 2, 3, 4, 5],
 *   drop(2),
 * );
 * console.log(await Array.fromAsync(iter)); // [3, 4, 5]
 * ```
 */
export function drop(
  limit: number,
): <T>(iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T> {
  return (iterable) => base(iterable, limit);
}
