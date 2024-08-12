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
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/compact compact} to remove nullish values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/filter filter} to remove values based on a function.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/compress compress} to compress iterables synchronously.
 *
 * @param iterable The iterable to compress.
 * @param selectors The selectors to use.
 * @returns The compressed iterable.
 *
 * @example
 * ```ts
 * import { compress } from "@core/iterutil/async/compress";
 *
 * const iter = compress(
 *   [1, 2, 3, 4, 5],
 *   [true, false, true, false, true],
 * );
 * console.log(await Array.fromAsync(iter)); // [1, 3, 5]
 * ```
 */
export async function* compress<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  selectors: Iterable<boolean> | AsyncIterable<boolean>,
): AsyncIterable<T> {
  const it1 = Symbol.iterator in iterable
    ? iterable[Symbol.iterator]()
    : iterable[Symbol.asyncIterator]();
  const it2 = Symbol.iterator in selectors
    ? selectors[Symbol.iterator]()
    : selectors[Symbol.asyncIterator]();
  while (true) {
    const [
      { done: done1, value: value1 },
      { done: done2, value: value2 },
    ] = await Promise.all([it1.next(), it2.next()]);
    if (done1 || done2) {
      break;
    }
    if (value2) {
      yield value1;
    }
  }
}
