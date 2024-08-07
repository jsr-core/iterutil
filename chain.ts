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
 */
export function* chain<T>(...iterables: Iterable<T>[]): Iterable<T> {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
