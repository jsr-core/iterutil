import { every as base } from "@core/iterutil/every";

/**
 * Returns an operator that tests whether every element in the iterable satisfies the provided testing function.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/every/~/every every} for native every.
 *
 * @param fn The testing function.
 * @returns A function that tests whether every element in the iterable satisfies the provided testing function.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { every } from "@core/iterutil/pipe/every";
 *
 * const value = pipe(
 *   [1, 2, 3],
 *   every((v) => v > 0),
 * );
 * console.log(value); // true
 * ```
 */
export function every<T>(
  fn: (value: T) => boolean,
): (iterable: Iterable<T>) => boolean {
  return (iterable) => base(iterable, fn);
}
