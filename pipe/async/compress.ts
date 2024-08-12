import { compress as base } from "@core/iterutil/async/compress";

/**
 * Returns an operator that compresses an iterable by selecting elements using a selector iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/compress/~/compress compress} for native compress.
 *
 * @param selectors The selectors to use.
 * @returns An operator that compresses an iterable by selecting elements using a selector iterable.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { compress } from "@core/iterutil/pipe/async/compress";
 *
 * const iter = pipe(
 *   [1, 2, 3, 4, 5],
 *   compress([true, false, true, false, true]),
 * );
 * console.log(await Array.fromAsync(iter)); // [1, 3, 5]
 * ```
 */
export function compress(
  selectors: Iterable<boolean> | AsyncIterable<boolean>,
): <T>(iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T> {
  return (iterable) => base(iterable, selectors);
}
