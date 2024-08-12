/**
 * Zips multiple iterables into a single iterable.
 *
 * The resulting iterable will yield arrays of elements from the input iterables.
 * The first array will contain the first element of each input iterable, the second array will contain the second element of each input iterable, and so on.
 *
 * If the input iterables have different lengths, the resulting iterable will stop when the shortest input iterable is exhausted.
 * The remaining elements from the longer input iterables will be ignored.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/async/chain chain} to chain iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/async/enumerate enumerate} to zip with indices.
 * Use {@linkcode https://jsr.io/@core/iterutil/zip zip} to zip iterables synchronously.
 *
 * @param iterables The iterables to zip.
 * @returns The zipped iterable.
 *
 * @example
 * ```ts
 * import { zip } from "@core/iterutil/async/zip";
 *
 * const iter = zip(
 *   [1, 2, 3],
 *   ["a", "b", "c"],
 *   [true, false, true],
 * );
 * console.log(await Array.fromAsync(iter)); // [[1, "a", true], [2, "b", false], [3, "c", true]]
 * ```
 */
export async function* zip<
  U extends readonly [
    Iterable<unknown> | AsyncIterable<unknown>,
    Iterable<unknown> | AsyncIterable<unknown>,
    ...(Iterable<unknown> | AsyncIterable<unknown>)[],
  ],
>(
  ...iterables: U
): AsyncIterable<Zip<U>> {
  const iterators = iterables.map((it) =>
    Symbol.iterator in it ? it[Symbol.iterator]() : it[Symbol.asyncIterator]()
  );
  while (true) {
    const results = await Promise.all(iterators.map((it) => it.next()));
    if (results.find(({ done }) => !!done)) {
      break;
    }
    yield results.map(({ value }) => value) as Zip<U>;
  }
}

/**
 * @internal
 */
export type Zip<
  T extends readonly (Iterable<unknown> | AsyncIterable<unknown>)[],
> = {
  [P in keyof T]: T[P] extends Iterable<infer U> ? U
    : T[P] extends AsyncIterable<infer U> ? U
    : never;
};
