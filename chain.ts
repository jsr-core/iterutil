/**
 * Chains multiple iterables together.
 *
 * @param iterables The iterables to chain.
 * @returns The chained iterable.
 *
 * @example
 * ```ts
 * import { chain } from "@core/iterutil/chain";
 *
 * const iter = chain([1, 2], [3, 4]);
 * console.log([...iter]); // [1, 2, 3, 4]
 * ```
 *
 * It supports chaining malformed iterables.
 *
 * @example
 * ```ts
 * import { chain } from "@core/iterutil/chain";
 *
 * const iter = chain([1, 2], ["a", "b"], [true]);
 * console.log([...iter]); // [1, 2, "a", "b", true]
 * ```
 */
export function* chain<T extends Iterable<unknown>[]>(
  ...iterables: T
): Iterable<Chain<T>> {
  for (const iterable of iterables) {
    yield* iterable as Iterable<Chain<T>>;
  }
}

export type Chain<T> = T extends readonly [] ? never
  : T extends readonly [Iterable<infer U>] ? U
  : T extends readonly [Iterable<infer U>, ...infer R] ? U | Chain<R>
  : never;
