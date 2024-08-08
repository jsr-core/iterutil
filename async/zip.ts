/**
 * Zips multiple iterables into a single iterable.
 *
 * @param iterables The iterables to zip.
 * @returns The zipped iterable.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { zip } from "@core/iterutil/async/zip";
 *
 * const iter = zip([1, 2, 3], ["a", "b", "c"]);
 * console.log(await toArray(iter)); // [[1, "a"], [2, "b"], [3, "c"]]
 * ```
 */
export async function* zip<
  U extends (Iterable<unknown> | AsyncIterable<unknown>)[],
>(
  ...iterables: U
): AsyncIterable<Zip<U>> {
  const its = iterables.map((iterable) =>
    Symbol.iterator in iterable
      ? iterable[Symbol.iterator]()
      : iterable[Symbol.asyncIterator]()
  );
  while (true) {
    const rs = await Promise.all(its.map((it) => it.next()));
    if (rs.find(({ done }) => !!done)) {
      break;
    }
    yield rs.map(({ value }) => value) as Zip<U>;
  }
}

/**
 * @inner
 */
export type Zip<T extends (Iterable<unknown> | AsyncIterable<unknown>)[]> = {
  [P in keyof T]: T[P] extends Iterable<infer U> ? U
    : T[P] extends AsyncIterable<infer U> ? U
    : never;
};
