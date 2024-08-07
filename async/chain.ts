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
 */
export async function* chain<T>(
  ...iterables: (Iterable<T> | AsyncIterable<T>)[]
): AsyncIterable<T> {
  for await (const iterable of iterables) {
    for await (const value of iterable) {
      yield value;
    }
  }
}
