/**
 * Zips multiple iterables into a single iterable.
 *
 * The resulting iterable will yield arrays of elements from the input iterables.
 * The first array will contain the first element of each input iterable, the second array will contain the second element of each input iterable, and so on.
 *
 * If the input iterables have different lengths, the resulting iterable will stop when the shortest input iterable is exhausted.
 * The remaining elements from the longer input iterables will be ignored.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/chain chain} to chain iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/enumerate enumerate} to zip with indices.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/zip async zip} to zip asynchronously.;w
 *
 * @param iterables The iterables to zip.
 * @returns The zipped iterable.
 *
 * @example
 * ```ts
 * import { zip } from "@core/iterutil/zip";
 *
 * const iter = zip(
 *   [1, 2, 3],
 *   ["a", "b", "c"],
 *   [true, false, true],
 * );
 * console.log(Array.from(iter)); // [[1, "a", true], [2, "b", false], [3, "c", true]]
 * ```
 */
export function* zip<
  U extends readonly [
    Iterable<unknown>,
    Iterable<unknown>,
    ...Iterable<unknown>[],
  ],
>(
  ...iterables: U
): Iterable<Zip<U>> {
  const iterators = iterables.map((it) => it[Symbol.iterator]());
  while (true) {
    const results = iterators.map((it) => it.next());
    if (results.find(({ done }) => !!done)) {
      break;
    }
    yield results.map(({ value }) => value) as Zip<U>;
  }
}

/**
 * @internal
 */
export type Zip<T extends readonly Iterable<unknown>[]> = {
  [P in keyof T]: T[P] extends Iterable<infer U> ? U : never;
};
