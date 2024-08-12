import { flatMap as base } from "@core/iterutil/flat-map";

/**
 * Returns an operator that flat maps the iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/flat-map/~/flatMap flatMap} for native flatMap.
 *
 * @param fn The flat mapping function.
 * @returns An operator that flat maps the iterable.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { flatMap } from "@core/iterutil/pipe/flat-map";
 *
 * const iter = pipe(
 *   [1, 2, 3],
 *   flatMap((v) => [v, v]),
 * );
 * console.log(Array.from(iter)); // [1, 1, 2, 2, 3, 3]
 * ```
 */
export function flatMap<T, U>(
  fn: (value: T, index: number) => Iterable<U>,
): (iterable: Iterable<T>) => Iterable<U> {
  return (iterable) => base(iterable, fn);
}
