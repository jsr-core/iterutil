import { find as base } from "@core/iterutil/async/find";

/**
 * Returns an operator that finds the first element that satisfies the provided testing function.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/find/~/find find} for native find.
 *
 * @param fn The testing function.
 * @returns An operator that finds the first element that satisfies the provided testing function.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { find } from "@core/iterutil/pipe/async/find";
 *
 * const value = await pipe(
 *   [1, 2, 3, 4, 5],
 *   find((v) => v % 2 === 0),
 * );
 * console.log(value); // 2
 * ```
 */
export function find<T>(
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<T | undefined> {
  return (iterable) => base(iterable, fn);
}
