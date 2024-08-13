import { nth as base } from "@core/iterutil/async/nth";

/**
 * Returns an operator that returns the n-th element of an iterable. If the length of the iterable is less, returns `undefined`.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/nth/~/nth nth} for native nth.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { nth } from "@core/iterutil/pipe/async/nth";
 *
 * const value = await pipe(
 *   [1, 2, 3],
 *   nth(1),
 * );
 * console.log(value); // 2
 * ```
 */
export function nth(
  index: number,
): <T>(iterable: Iterable<T> | AsyncIterable<T>) => Promise<T | undefined> {
  return (iterable) => base(iterable, index);
}
