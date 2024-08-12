/**
 * Chains multiple iterables and returns the chained iterable.
 *
 * The chained iterable will yield the elements of the first iterable, then the
 * elements of the second iterable, and so on.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/async/zip zip} to zip iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/chain chain} to chain iterables synchronously.
 *
 * @param iterables The iterables to chain.
 * @returns The chained iterable.
 *
 * @example
 * ```ts
 * import { chain } from "@core/iterutil/async/chain";
 *
 * const iter = chain(
 *   [1, 2, 3],
 *   ["a", "b"],
 *   [true]
 * );
 * console.log(await Array.fromAsync(iter)); // [1, 2, 3, "a", "b", true]
 * ```
 */
export async function* chain<
  T extends readonly [
    Iterable<unknown> | AsyncIterable<unknown>,
    Iterable<unknown> | AsyncIterable<unknown>,
    ...(Iterable<unknown> | AsyncIterable<unknown>)[],
  ],
>(
  ...iterables: T
): AsyncIterable<Chain<T>> {
  for await (const iterable of iterables) {
    for await (const value of iterable) {
      yield value as Chain<T>;
    }
  }
}

/**
 * @internal
 */
export type Chain<T> = T extends readonly [] ? never
  : T extends readonly [Iterable<infer U>] ? U
  : T extends readonly [AsyncIterable<infer U>] ? U
  : T extends readonly [Iterable<infer U>, ...infer R] ? U | Chain<R>
  : T extends readonly [AsyncIterable<infer U>, ...infer R] ? U | Chain<R>
  : never;
