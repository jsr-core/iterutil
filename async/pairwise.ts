/**
 * Returns an iterable that pairs adjacent elements from the input iterable.
 *
 * When the input iterable has a finite number of items `n`, the output iterable will have `n - 1` items.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/pairwise pairwise} to pair elements from an iterable synchronously.
 *
 * @param iterable The iterable to pair elements from.
 * @returns The paired iterable.
 *
 * @example
 * ```ts
 * import { pairwise } from "@core/iterutil/async/pairwise";
 *
 * const iter = pairwise([1, 2, 3, 4, 5]);
 * console.log(await Array.fromAsync(iter)); // [[1, 2], [2, 3], [3, 4], [4, 5]]
 * ```
 */
export async function* pairwise<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): AsyncIterable<[T, T]> {
  const it = Symbol.iterator in iterable
    ? iterable[Symbol.iterator]()
    : iterable[Symbol.asyncIterator]();
  let result = await it.next();
  while (!result.done) {
    const first = result.value;
    result = await it.next();
    if (result.done) {
      break;
    }
    const second = result.value;
    yield [first, second];
  }
}
