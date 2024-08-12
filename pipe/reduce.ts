import { reduce as base } from "@core/iterutil/reduce";

/**
 * Returns an operator that reduces an iterable into a single value.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/reduce/~/reduce reduce} for native reduce.
 *
 * @param fn The function to reduce with.
 * @returns An operator that reduces an iterable into a single value.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { reduce } from "@core/iterutil/pipe/reduce";
 *
 * const result = pipe(
 *   [1, 2, 3, 4, 5],
 *   reduce((acc, v) => acc + v),
 * );
 * console.log(result); // 15
 * ```
 */
export function reduce<T>(
  fn: (acc: T, value: T, index: number) => T,
): (iterable: Iterable<T>) => T | undefined;

/**
 * Returns an operator that reduces an iterable into a single value.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/reduce/~/reduce reduce} for native reduce.
 *
 * @param fn The function to reduce with.
 * @param initial The initial value to start reducing with.
 * @returns An operator that reduces an iterable into a single value.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { reduce } from "@core/iterutil/pipe/reduce";
 *
 * const result = pipe(
 *   [1, 2, 3, 4, 5],
 *   reduce((acc, v) => acc + v),
 * );
 * console.log(result); // 12345
 * ```
 */
export function reduce<T, U>(
  fn: (acc: U, value: T, index: number) => U,
  initial: U,
): (iterable: Iterable<T>) => U;

export function reduce<T, U = T>(
  fn: (acc: U, value: T, index: number) => U,
  initial?: U,
): (iterable: Iterable<T>) => U | undefined {
  return (iterable) => base(iterable, fn, initial as U);
}
