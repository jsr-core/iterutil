import { takeWhile as base } from "@core/iterutil/take-while";

/**
 * Returns an operator that takes elements from the iterable while the predicate returns `true`.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/take-while/~/takeWhile takeWhile} for native takeWhile.
 *
 * @param fn The predicate to take elements with.
 * @returns An operator that takes elements from the iterable while the predicate returns `true`.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { takeWhile } from "@core/iterutil/pipe/take-while";
 *
 * const iter = pipe(
 *   [1, 2, 3, 4, 5],
 *   takeWhile((v) => v < 4),
 * );
 * console.log(Array.from(iter)); // [1, 2, 3]
 * ```
 */
export function takeWhile<T>(
  fn: (value: T, index: number) => boolean,
): (iterable: Iterable<T>) => Iterable<T> {
  return (iterable) => base(iterable, fn);
}
