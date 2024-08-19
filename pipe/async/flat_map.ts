import { flatMap as base } from "../../async/flat_map.ts";

/**
 * Returns an operator that flat maps the iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/flat-map/~/flatMap flatMap} for native flatMap.
 *
 * @param fn The flat mapping function.
 * @returns An operator that flat maps the iterable.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { flatMap } from "@core/iterutil/pipe/async/flat-map";
 *
 * const iter = pipe(
 *   [1, 2, 3],
 *   flatMap((v) => [v, v]),
 * );
 * console.log(await Array.fromAsync(iter)); // [1, 1, 2, 2, 3, 3]
 * ```
 */
export function flatMap<T, U>(
  fn: (
    value: T,
    index: number,
  ) => Iterable<U> | AsyncIterable<U> | Promise<Iterable<U>>,
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U> {
  return (iterable) => base(iterable, fn);
}
