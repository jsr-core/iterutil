/**
 * Zips multiple iterables into a single iterable.
 *
 * @param iterables The iterables to zip.
 * @returns The zipped iterable.
 *
 * @example
 * ```ts
 * import { zip } from "@core/iterutil/zip";
 *
 * const iter = zip([1, 2, 3], ["a", "b", "c"]);
 * console.log([...iter]); // [[1, "a"], [2, "b"], [3, "c"]]
 * ```
 */
export function* zip<U extends Iterable<unknown>[]>(
  ...iterables: U
): Iterable<Zip<U>> {
  const its = iterables.map((iterable) => iterable[Symbol.iterator]());
  while (true) {
    const rs = its.map((it) => it.next());
    if (rs.find(({ done }) => !!done)) {
      break;
    }
    yield rs.map(({ value }) => value) as Zip<U>;
  }
}

/**
 * @internal
 */
export type Zip<T extends Iterable<unknown>[]> = {
  [P in keyof T]: T[P] extends Iterable<infer U> ? U : never;
};
