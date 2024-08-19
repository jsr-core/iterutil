import { type Zip, zip as base } from "../zip.ts";

/**
 * Returns an operator that zips the provided iterables with the iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/zip/~/zip zip} for native zip.
 *
 * @param iterables The iterables to zip.
 * @returns An operator that zips the provided iterables with the iterable.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { zip } from "@core/iterutil/pipe/zip";
 *
 * const iter = pipe(
 *   [1, 2, 3],
 *   zip(["a", "b", "c"], [true, true, false]),
 * );
 * console.log(Array.from(iter)); // [[1, "a", true], [2, "b", true], [3, "c", false]]
 * ```
 */
export function zip<
  U extends readonly [
    Iterable<unknown>,
    ...Iterable<unknown>[],
  ],
>(
  ...iterables: U
): <T>(iterable: Iterable<T>) => Iterable<[T, ...Zip<U>]> {
  return <T>(iterable: Iterable<T>) =>
    base(iterable, ...iterables) as Iterable<[T, ...Zip<U>]>;
}
