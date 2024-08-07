/**
 * Take elements from the iterable while the predicate is true.
 *
 * @param iterable The iterable to take elements from.
 * @param fn The predicate to take elements with.
 * @returns The taken iterable.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { takeWhile } from "@core/iterutil/async/take-while";
 *
 * const iter = takeWhile([1, 2, 3, 4, 5], (value) => value < 4);
 * console.log(await toArray(iter)); // [1, 2, 3]
 * ```
 */
export async function* takeWhile<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): AsyncIterable<T> {
  let index = 0;
  for await (const value of iterable) {
    if (!await fn(value, index++)) {
      break;
    }
    yield value;
  }
}
