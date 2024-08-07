/**
 * Take elements from the iterable while the predicate is true.
 *
 * @param iterable The iterable to take elements from.
 * @param fn The predicate to take elements with.
 * @returns The taken iterable.
 *
 * @example
 * ```ts
 * import { takeWhile } from "@core/iterutil/take-while";
 *
 * const iter = takeWhile([1, 2, 3, 4, 5], (value) => value < 4);
 * console.log([...iter]); // [1, 2, 3]
 * ```
 */
export function* takeWhile<T>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => boolean,
): Iterable<T> {
  let index = 0;
  for (const value of iterable) {
    if (!fn(value, index++)) {
      break;
    }
    yield value;
  }
}
