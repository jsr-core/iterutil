/**
 * Converts an iterable to an iterable iterator.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/async/iter iter} for `AsyncIterableIterator`.
 *
 * @param iterable The iterable to convert.
 * @returns The iterable iterator.
 *
 * @example
 * ```ts
 * import { iter } from "@core/iterutil/iter";
 *
 * const it = iter([1, 2, 3, 4, 5]);
 * console.log(it.next()); // { value: 1, done: false }
 * console.log(it.next()); // { value: 2, done: false }
 *
 * for (const value of it) {
 *   console.log(value);
 * }
 * // 3
 * // 4
 * // 5
 * ```
 */
export function iter<T>(iterable: Iterable<T>): IterableIterator<T> {
  const inner = iterable[Symbol.iterator]();
  const it = {
    next: () => inner.next(),
    [Symbol.iterator]: () => it,
  };
  return it;
}
