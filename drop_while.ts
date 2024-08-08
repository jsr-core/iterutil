/**
 * Drops elements from the iterable while the predicate function returns true.
 *
 * The first element that does not match the predicate is included in the output.
 * If the predicate never returns false, the output will be an empty iterable.
 *
 * @param iterable - The iterable to drop elements from.
 * @param fn - The predicate function to drop elements with.
 * @returns The iterable with elements dropped while the predicate returns true.
 * @see {@link module:iterutil/async/drop-while.dropWhile} for the asynchronous version.
 * @see {@link module:iterutil/drop.drop} to drop a specific number of elements from the iterable.
 * @see {@link module:iterutil/take.take} to take a specific number of elements from the iterable.
 * @see {@link module:iterutil/take-while.takeWhile} to take elements while a predicate is true.
 *
 * @example
 * ```ts
 * import { dropWhile } from "@core/iterutil/drop-while";
 *
 * const iter = dropWhile([1, 2, 3, 4, 5], (x) => x < 3);
 * console.log([...iter]); // [3, 4, 5]
 * ```
 */
export function* dropWhile<T>(
  iterable: Iterable<T>,
  fn: (value: T) => boolean,
): Iterable<T> {
  let dropping = true;
  for (const value of iterable) {
    if (dropping && fn(value)) {
      continue;
    }
    dropping = false;
    yield value;
  }
}
