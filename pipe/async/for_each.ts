import { forEach as base } from "../../async/for_each.ts";

/**
 * Returns an operator that calls the given function for each value in the iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/for-each/~/forEach forEach} for native forEach.
 *
 * @param fn The function to call for each value.
 * @returns An operator that calls the given function for each value in the iterable.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { forEach } from "@core/iterutil/pipe/async/for-each";
 *
 * await pipe(
 *   [1, 2, 3],
 *   forEach((v) => console.log(v)),
 * );
 * // 1
 * // 2
 * // 3
 * ```
 */
export function forEach<T>(
  fn: (value: T, index: number) => void | Promise<void>,
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<void> {
  return (iterable) => base(iterable, fn);
}
