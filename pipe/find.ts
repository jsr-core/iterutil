import { find as base } from "../find.ts";

/**
 * Returns an operator that finds the first element that satisfies the provided testing function.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/find/~/find find} for native find.
 *
 * @param fn The testing function.
 * @returns An operator that finds the first element that satisfies the provided testing function.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { find } from "@core/iterutil/pipe/find";
 *
 * const value = pipe(
 *   [1, 2, 3, 4, 5],
 *   find((v) => v % 2 === 0),
 * );
 * console.log(value); // 2
 * ```
 */
export function find<T>(
  fn: (value: T, index: number) => boolean,
): (iterable: Iterable<T>) => T | undefined {
  return (iterable) => base(iterable, fn);
}
