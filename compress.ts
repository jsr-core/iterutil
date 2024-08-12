/**
 * Compresses an iterable by selecting elements using a selector iterable.
 *
 * The compressed iterable will yield the elements of the iterable for which the
 * corresponding selector is true.
 *
 * If the selector iterable is shorter than the input iterable, the output will
 * be truncated to the length of the selector iterable.
 *
 * If the input iterable is shorter than the selector iterable, the output will
 * be truncated to the length of the input iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/compact compact} to remove nullish values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/filter filter} to remove values based on a function.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/compress compress} to compress iterables asynchronously.
 *
 * @param iterable The iterable to compress.
 * @param selectors The selectors iterable to use.
 * @returns The compressed iterable.
 *
 * @example
 * ```ts
 * import { compress } from "@core/iterutil/compress";
 *
 * const iter = compress(
 *   [1, 2, 3, 4, 5],
 *   [true, false, true, false, true],
 * );
 * console.log(Array.from(iter)); // [1, 3, 5]
 * ```
 */
export function* compress<T>(
  iterable: Iterable<T>,
  selectors: Iterable<boolean>,
): Iterable<T> {
  const it1 = iterable[Symbol.iterator]();
  const it2 = selectors[Symbol.iterator]();
  while (true) {
    const { done: done1, value: value1 } = it1.next();
    const { done: done2, value: value2 } = it2.next();
    if (done1 || done2) {
      break;
    }
    if (value2) {
      yield value1;
    }
  }
}
