import { map as base } from "@core/iterutil/map";

/**
 * Returns an operator that maps the iterable using the provided function.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/map/~/map map} for native map.
 *
 * @param fn The mapping function.
 * @returns An operator that maps the iterable using the provided function.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { map } from "@core/iterutil/pipe/map";
 *
 * const iter = pipe(
 *   [1, 2, 3],
 *   map((v) => v * 2),
 * );
 * console.log(Array.from(iter)); // [2, 4, 6]
 * ```
 */
export function map<T, U>(
  fn: (value: T, index: number) => U,
): (iterable: Iterable<T>) => Iterable<U> {
  return (iterable) => base(iterable, fn);
}
