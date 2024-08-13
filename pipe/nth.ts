import { nth as base } from "@core/iterutil/nth";

/**
 * Returns an operator that returns the n-th element of an iterable. If the length of the iterable is less, returns `undefined`.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/nth/~/nth nth} for native nth.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { nth } from "@core/iterutil/pipe/nth";
 *
 * const value = pipe(
 *   [1, 2, 3],
 *   nth(1),
 * );
 * console.log(value); // 2
 * ```
 */
export function nth(
  index: number,
): <T>(iterable: Iterable<T>) => T | undefined {
  return (iterable) => base(iterable, index);
}
