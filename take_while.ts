/**
 * Takes elements from the iterable while the predicate is true.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/take/~/take take} to take a specific number of elements.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/drop/~/drop drop} to drop a specific number of elements.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/take-while/~/takeWhile takeWhile} to take elements asynchronously.
 *
 * @param iterable The iterable to take elements from.
 * @param fn The predicate to take elements with.
 * @returns The taken iterable.
 *
 * @example
 * ```ts
 * import { takeWhile } from "@core/iterutil/take-while";
 *
 * const iter = takeWhile(
 *   [1, 2, 3, 4, 5],
 *   (v) => v < 4,
 * );
 * console.log(Array.from(iter)); // [1, 2, 3]
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
