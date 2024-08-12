import { type Chain, chain as base } from "@core/iterutil/async/chain";

/**
 * Returns an operator that chains multiple iterables to the iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/chain/~/chain chain} for native chain.
 *
 * @param iterables The iterables to chain to the iterable.
 * @returns An operator that chains multiple iterables to the iterable.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { chain } from "@core/iterutil/pipe/async/chain";
 *
 * const iter = pipe(
 *   [1, 2, 3],
 *   chain(["a", "b"], [true]),
 * );
 * console.log(await Array.fromAsync(iter)); // [1, 2, 3, "a", "b", true]
 * ```
 */
export function chain<
  U extends readonly [
    Iterable<unknown> | AsyncIterable<unknown>,
    ...(Iterable<unknown> | AsyncIterable<unknown>)[],
  ],
>(
  ...iterables: U
): <T>(
  iterable: Iterable<T> | AsyncIterable<T>,
) => AsyncIterable<T | Chain<U>> {
  return <T>(iterable: Iterable<T> | AsyncIterable<T>) =>
    base(iterable, ...iterables) as AsyncIterable<T | Chain<U>>;
}
