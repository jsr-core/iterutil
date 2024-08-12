/**
 * Drops elements from the iterable while the predicate returns true.
 *
 * The first element that does not match the predicate is included in the output.
 * If the predicate never returns false, the output will be an empty iterable.
 *
 * @param iterable The iterable to drop elements from.
 * @param fn The predicate function to drop elements with.
 * @returns The iterable with elements dropped while the predicate returns true.
 *
 * @example
 * ```ts
 * import { dropWhile } from "@core/iterutil/async/drop-while";
 *
 * const iter = dropWhile([1, 2, 3, 4, 5], (x) => x < 3);
 * console.log(await Array.fromAsync(iter)); // [3, 4, 5]
 * ```
 */
export async function* dropWhile<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T) => boolean | Promise<boolean>,
): AsyncIterable<T> {
  let dropping = true;
  for await (const value of iterable) {
    if (dropping && await fn(value)) {
      continue;
    }
    dropping = false;
    yield value;
  }
}
