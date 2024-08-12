/**
 * Drops elements from the iterable while the predicate returns true.
 *
 * The first element that does not match the predicate is included in the output.
 * If the predicate never returns false, the output will be an empty iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/drop drop} to drop a specific number of elements.
 * Use {@linkcode https://jsr.io/@core/iterutil/take take} to take a specific number of elements.
 * Use {@linkcode https://jsr.io/@core/iterutil/async/drop-while dropWhile} to drop elements asynchronously.
 *
 * @param iterable The iterable to drop elements from.
 * @param fn The predicate function to drop elements with.
 * @returns The iterable with elements dropped while the predicate returns true.
 *
 * @example
 * ```ts
 * import { dropWhile } from "@core/iterutil/drop-while";
 *
 * const iter = dropWhile(
 *   [1, 2, 3, 4, 5],
 *   (v) => v < 3,
 * );
 * console.log(Array.from(iter)); // [3, 4, 5]
 * ```
 */
export function* dropWhile<T>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => boolean,
): Iterable<T> {
  let dropping = true;
  let index = 0;
  for (const value of iterable) {
    if (dropping && fn(value, index++)) {
      continue;
    }
    dropping = false;
    yield value;
  }
}
