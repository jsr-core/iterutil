/**
 * Returns an iterable that pairs adjacent elements from the input iterable.
 *
 * When the input iterable has a finite number of items `n`, the output iterable will have `n - 1` items.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/async/pairwise pairwise} to pair elements from an iterable asynchronously.
 *
 * @param iterable The iterable to pair elements from.
 * @returns The paired iterable.
 *
 * @example
 * ```ts
 * import { pairwise } from "@core/iterutil/pairwise";
 *
 * const iter = pairwise([1, 2, 3, 4, 5]);
 * console.log(Array.from(iter)); // [[1, 2], [2, 3], [3, 4], [4, 5]]
 * ```
 */
export function* pairwise<T>(iterable: Iterable<T>): Iterable<[T, T]> {
  const it = iterable[Symbol.iterator]();
  let result = it.next();
  while (!result.done) {
    const first = result.value;
    result = it.next();
    if (result.done) {
      break;
    }
    const second = result.value;
    yield [first, second];
  }
}
