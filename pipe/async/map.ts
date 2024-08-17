import { map as base } from "../../async/map.ts";

/**
 * Returns an operator that maps the iterable using the provided function.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/map/~/map map} for native map.
 *
 * @param fn The mapping function.
 * @returns An operator that maps the iterable using the provided function.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { map } from "@core/iterutil/pipe/async/map";
 *
 * const iter = pipe(
 *   [1, 2, 3],
 *   map((v) => v * 2),
 * );
 * console.log(await Array.fromAsync(iter)); // [2, 4, 6]
 * ```
 */
export function map<T, U>(
  fn: (value: T, index: number) => U | Promise<U>,
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U> {
  return (iterable) => base(iterable, fn);
}
