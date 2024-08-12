import { takeWhile as base } from "@core/iterutil/async/take-while";

/**
 * Returns an operator that takes elements from the iterable while the predicate returns `true`.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/take-while/~/takeWhile takeWhile} for native takeWhile.
 *
 * @param fn The predicate to take elements with.
 * @returns An operator that takes elements from the iterable while the predicate returns `true`.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { takeWhile } from "@core/iterutil/pipe/async/take-while";
 *
 * const iter = pipe(
 *   [1, 2, 3, 4, 5],
 *   takeWhile((v) => v < 4),
 * );
 * console.log(await Array.fromAsync(iter)); // [1, 2, 3]
 * ```
 */
export function takeWhile<T>(
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T> {
  return (iterable) => base(iterable, fn);
}
