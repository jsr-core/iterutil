import { filter as base } from "../../async/filter.ts";

export function filter<T, U extends T>(
  fn: (value: T, index: number) => value is U,
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U>;
export function filter<T>(
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>;
/**
 * Returns an operator that filters an iterable based on a function.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/filter/~/filter filter} for native filter.
 *
 * @params fn The function to filter the iterable.
 * @returns An operator that filters an iterable based on a function.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { filter } from "@core/iterutil/pipe/async/filter";
 *
 * const iter = pipe(
 *   [1, 2, 3, 4, 5],
 *   filter((v) => v % 2 === 0),
 * );
 * console.log(await Array.fromAsync(iter)); // [2, 4]
 * ```
 */
export function filter<T>(
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T> {
  return (iterable) => base(iterable, fn);
}
