import { compress as base } from "../compress.ts";

/**
 * Returns an operator that compresses an iterable by selecting elements using a selector iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/compress/~/compress compress} for native compress.
 *
 * @param selectors The selectors to use.
 * @returns An operator that compresses an iterable by selecting elements using a selector iterable.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { compress } from "@core/iterutil/pipe/compress";
 *
 * const iter = pipe(
 *   [1, 2, 3, 4, 5],
 *   compress([true, false, true, false, true]),
 * );
 * console.log(Array.from(iter)); // [1, 3, 5]
 * ```
 */
export function compress(
  selectors: Iterable<boolean>,
): <T>(iterable: Iterable<T>) => Iterable<T> {
  return (iterable) => base(iterable, selectors);
}
