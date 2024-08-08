/**
 * Drops the first `limit` items from the iterable.
 *
 * It throws an error if `limit` is less than 0.
 *
 * @param iterable The iterable to drop items from.
 * @param limit The number of items to drop.
 * @returns The iterable with the first `limit` items dropped.
 *
 * @example
 * ```ts
 * import { drop } from "@core/iterutil/drop";
 *
 * const iter = drop([1, 2, 3, 4, 5], 2);
 * console.log([...iter]); // [3, 4, 5]
 * ```
 */
export function drop<T>(iterable: Iterable<T>, limit: number): Iterable<T> {
  if (limit < 0 || !Number.isSafeInteger(limit)) {
    throw new DropLimitError(limit);
  }
  return function* () {
    let i = 0;
    for (const item of iterable) {
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
