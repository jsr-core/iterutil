/**
 * Chains multiple iterables together.
 *
 * @param iterables The iterables to chain.
 * @returns The chained iterable.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { chain } from "@core/iterutil/async/chain";
 *
 * const iter = chain([1, 2], [3, 4]);
 * console.log(await toArray(iter)); // [1, 2, 3, 4]
 * ```
 *
 * It supports chaining malformed iterables.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { chain } from "@core/iterutil/async/chain";
 *
 * const iter = chain([1, 2], ["a", "b"], [true]);
 * console.log(await toArray(iter)); // [1, 2, "a", "b", true]
 * ```
 */
export async function* chain<
  T extends (Iterable<unknown> | AsyncIterable<unknown>)[],
>(
  ...iterables: T
): AsyncIterable<Chain<T>> {
  for await (const iterable of iterables) {
    for await (const value of iterable) {
      yield value as Chain<T>;
    }
  }
}

export type Chain<T> = T extends readonly [] ? never
  : T extends readonly [Iterable<infer U>] ? U
  : T extends readonly [AsyncIterable<infer U>] ? U
  : T extends readonly [Iterable<infer U>, ...infer R] ? U | Chain<R>
  : T extends readonly [AsyncIterable<infer U>, ...infer R] ? U | Chain<R>
  : never;
