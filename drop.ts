/**
 * Drops the first `limit` items from the iterable.
 *
 * @param iterable - The iterable to drop items from.
 * @param limit - The number of items to drop. It must be 0 or positive safe integer.
 * @returns The iterable with the first `limit` items dropped.
 * @throws {DropLimitError} If the limit is not a safe integer or is negative.
 * @see {@link module:iterutil/async/drop.drop} for the asynchronous version.
 * @see {@link module:iterutil/drop-while.dropWhile} to drop elements while a predicate is true.
 * @see {@link module:iterutil/take.take} to take a specific number of elements from the iterable.
 * @see {@link module:iterutil/take-while.takeWhile} to take elements while a predicate is true.
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
