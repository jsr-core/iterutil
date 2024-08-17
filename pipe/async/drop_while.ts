import { dropWhile as base } from "../../async/drop_while.ts";

/**
 * Returns an operator that drops elements from the iterable while the predicate returns true.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/drop-while/~/dropWhile dropWhile} for native dropWhile.
 *
 * @param fn The predicate function.
 * @returns An operator that drops elements from the iterable while the predicate returns true.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { dropWhile } from "@core/iterutil/pipe/async/drop-while";
 *
 * const iter = pipe(
 *   [1, 2, 3, 4, 5],
 *   dropWhile((v) => v < 3),
 * );
 * console.log(await Array.fromAsync(iter)); // [3, 4, 5]
 * ```
 */
export function dropWhile<T>(
  fn: (value: T) => boolean,
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T> {
  return (iterable) => base(iterable, fn);
}
