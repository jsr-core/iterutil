/**
 * Chains multiple iterables and returns the chained iterable.
 *
 * The chained iterable will yield the elements of the first iterable, then the
 * elements of the second iterable, and so on.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/zip/~/zip zip} to zip iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/chain/~/chain chain} to chain iterables asynchronously.
 *
 * @param iterables The iterables to chain.
 * @returns The chained iterable.
 *
 * @example
 * ```ts
 * import { chain } from "@core/iterutil/chain";
 *
 * const iter = chain(
 *   [1, 2, 3],
 *   ["a", "b"],
 *   [true]
 * );
 * console.log(Array.from(iter)); // [1, 2, 3, "a", "b", true]
 * ```
 */
export function* chain<
  T extends readonly [
    Iterable<unknown>,
    Iterable<unknown>,
    ...Iterable<unknown>[],
  ],
>(
  ...iterables: T
): Iterable<Chain<T>> {
  for (const iterable of iterables) {
    yield* iterable as Iterable<Chain<T>>;
  }
}

/**
 * @internal
 */
export type Chain<T> = T extends readonly [] ? never
  : T extends readonly [Iterable<infer U>] ? U
  : T extends readonly [Iterable<infer U>, ...infer R] ? U | Chain<R>
  : never;
