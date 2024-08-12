/**
 * Drops the first `limit` items from the iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/drop-while dropWhile} to drop items while a condition is met.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/take take} to take a specific number of items from an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/drop drop} to drop items asynchronously.
 *
 * @param iterable The iterable to drop items from.
 * @param limit The number of items to drop. It must be 0 or positive safe integer.
 * @returns The iterable with the first `limit` items dropped.
 * @throws {RangeError} if `limit` is less than 0 or non safe integer.
 *
 * @example
 * ```ts
 * import { drop } from "@core/iterutil/drop";
 *
 * const iter = drop([1, 2, 3, 4, 5], 2);
 * console.log(Array.from(iter)); // [3, 4, 5]
 * ```
 */
export function drop<T>(iterable: Iterable<T>, limit: number): Iterable<T> {
  if (limit < 0 || !Number.isSafeInteger(limit)) {
    throw new RangeError(
      `limit must be 0 or positive safe integer, but got ${limit}.`,
    );
  }
  if (limit === 0) {
    return iterable;
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
