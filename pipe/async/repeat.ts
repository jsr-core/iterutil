import { repeat as base } from "../../async/repeat.ts";

/**
 * An operator to return a function that repeats the elements of an iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/repeat/~/repeat repeat} for native repeat.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { repeat } from "@core/iterutil/pipe/async/repeat";
 *
 * const iter = pipe(
 *   [1, 2, 3],
 *   repeat(2),
 * );
 * console.log(await Array.fromAsync(iter)); // [1, 2, 3, 1, 2, 3]
 * ```
 */
export function repeat<T>(
  n: number,
): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T> {
  return (iterable: Iterable<T> | AsyncIterable<T>) => base(iterable, n);
}
