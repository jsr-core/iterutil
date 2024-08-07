/**
 * Convert an iterable to an iterator.
 *
 * @param iterable The iterable to convert.
 * @returns The iterator.
 *
 * @example
 * ```ts
 * import { iter } from "@core/iterutil/async/iter";
 *
 * const it = iter([1, 2, 3, 4, 5]);
 * console.log(await it.next()); // { value: 1, done: false }
 * console.log(await it.next()); // { value: 2, done: false }
 *
 * for await (const value of it) {
 *   console.log(value);
 * }
 * // 3
 * // 4
 * // 5
 * ```
 */
export function iter<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): AsyncIterableIterator<T> {
  const inner = Symbol.iterator in iterable
    ? iterable[Symbol.iterator]()
    : iterable[Symbol.asyncIterator]();
  const it = {
    next: async () => await inner.next(),
    [Symbol.asyncIterator]: () => it,
  };
  return it;
}
