import { take as base } from "../take.ts";
/**
 * Returns an operator that takes the first `limit` items from the iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/take/~/take take} for native take.
 *
 * @param limit The number of items to take. It must be 0 or positive safe integer.
 * @returns An operator that takes the first `limit` items from the iterable.
 * @throws {RangeError} if `limit` is less than 0 or non safe integer.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { take } from "@core/iterutil/pipe/take";
 *
 * const iter = pipe([1, 2, 3, 4, 5], take(2));
 * console.log(Array.from(iter)); // [1, 2]
 * ```
 */
export function take(limit: number): <T>(iterable: Iterable<T>) => Iterable<T> {
  return (iterable) => base(iterable, limit);
}
