import { repeat as base } from "../repeat.ts";

/**
 * An operator to return a function that repeats the elements of an iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/repeat/~/repeat repeat} for native repeat.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { repeat } from "@core/iterutil/pipe/repeat";
 *
 * const iter = pipe(
 *   [1, 2, 3],
 *   repeat(2),
 * );
 * console.log(Array.from(iter)); // [1, 2, 3, 1, 2, 3]
 * ```
 */
export function repeat<T>(n: number): (iterable: Iterable<T>) => Iterable<T> {
  return (iterable: Iterable<T>) => base(iterable, n);
}
