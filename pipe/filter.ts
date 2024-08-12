import { filter as base } from "@core/iterutil/filter";

/**
 * Returns an operator that filters an iterable based on a function.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/filter/~/filter filter} for native filter.
 *
 * @params fn The function to filter the iterable.
 * @returns An operator that filters an iterable based on a function.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { filter } from "@core/iterutil/pipe/filter";
 *
 * const iter = pipe(
 *   [1, 2, 3, 4, 5],
 *   filter((v) => v % 2 === 0),
 * );
 * console.log(Array.from(iter)); // [2, 4]
 * ```
 */
export function filter<T>(
  fn: (value: T, index: number) => boolean,
): (iterable: Iterable<T>) => Iterable<T> {
  return (iterable) => base(iterable, fn);
}
