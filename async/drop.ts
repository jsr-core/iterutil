/**
 * Drops the first `limit` items from the iterable.
 *
 * @param iterable The iterable to drop items from.
 * @param limit The number of items to drop. It must be 0 or positive safe integer.
 * @returns The iterable with the first `limit` items dropped.
 * @throws {DropLimitError} If `limit` is less than 0 or non safe integer.
 *
 * @example
 * ```ts
 * import { drop } from "@core/iterutil/async/drop";
 *
 * const iter = drop([1, 2, 3, 4, 5], 2);
 * console.log(await Array.fromAsync(iter)); // [3, 4, 5]
 * ```
 */
export function drop<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  limit: number,
): AsyncIterable<T> {
  if (limit < 0 || !Number.isSafeInteger(limit)) {
    throw new DropLimitError(limit);
  }
  return async function* () {
    let i = 0;
    for await (const item of iterable) {
      if (i++ >= limit) {
        yield item;
      }
    }
  }();
}

/**
 * Error thrown when the 'limit' is negative or not a safe integer.
 */
export class DropLimitError extends Error {
  constructor(limit: number) {
    super(`The 'limit' must be 0 or positive safe integer, but got ${limit}.`);
  }
}
