import { type Chain, chain as base } from "@core/iterutil/chain";

/**
 * Returns an operator that chains multiple iterables to the iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/chain/~/chain chain} for native chain.
 *
 * @param iterables The iterables to chain to the iterable.
 * @returns An operator that chains multiple iterables to the iterable.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { chain } from "@core/iterutil/pipe/chain";
 *
 * const iter = pipe(
 *   [1, 2, 3],
 *   chain(["a", "b"], [true]),
 * );
 * console.log(Array.from(iter)); // [1, 2, 3, "a", "b", true]
 * ```
 */
export function chain<
  U extends readonly [
    Iterable<unknown>,
    ...Iterable<unknown>[],
  ],
>(
  ...iterables: U
): <T>(iterable: Iterable<T>) => Iterable<T | Chain<U>> {
  return <T>(iterable: Iterable<T>) =>
    base(iterable, ...iterables) as Iterable<T | Chain<U>>;
}
