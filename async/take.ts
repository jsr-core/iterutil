/**
 * Takes the first `limit` items from the iterable.
 *
 * @param iterable The iterable to take items from.
 * @param limit The number of items to take. It must be 0 or positive safe integer.
 * @returns The iterable with the first `limit` items taken.
 * @throws {TakeLimitError} If `limit` is less than 0 or non safe integer.
 *
 * @example
 * ```ts
 * import { take } from "@core/iterutil/async/take";
 *
 * const iter = take([1, 2, 3, 4, 5], 2);
 * console.log(await Array.fromAsync(iter)); // [1, 2]
 * ```
 */
export function take<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  limit: number,
): AsyncIterable<T> {
  if (limit < 0 || !Number.isSafeInteger(limit)) {
    throw new TakeLimitError(limit);
  }
  return async function* () {
    let i = 0;
    for await (const item of iterable) {
      if (i++ >= limit) {
        break;
      }
      yield item;
    }
  }();
}

/**
 * Error thrown when the 'limit' is negative or not a safe integer.
 */
export class TakeLimitError extends Error {
  constructor(limit: number) {
    super(`The 'limit' must be 0 or positive safe integer, but got ${limit}.`);
  }
}
