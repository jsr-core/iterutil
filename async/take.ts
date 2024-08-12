/**
 * Takes the first `limit` items from the iterable.
 *
 * Note that it will stop consuming the iterable once `limit` items are taken.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/take-while/~/takeWhile takeWhile} to take items while the predicate returns true.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/drop/~/drop drop} to drop items from the beginning.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/take/~/take take} to take items synchronously.
 *
 * @param iterable The iterable to take items from.
 * @param limit The number of items to take. It must be 0 or positive safe integer.
 * @returns The iterable with the first `limit` items taken.
 * @throws {RangeError} if `limit` is less than 0 or non safe integer.
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
    throw new RangeError(
      `limit must be 0 or positive safe integer, but got ${limit}.`,
    );
  }
  if (limit === 0) {
    return async function* () {}();
  }
  return async function* () {
    let i = 1;
    for await (const item of iterable) {
      yield item;
      if (i++ >= limit) {
        break;
      }
    }
  }();
}
