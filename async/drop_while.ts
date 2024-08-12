/**
 * Drops elements from the iterable while the predicate returns true.
 *
 * The first element that does not match the predicate is included in the output.
 * If the predicate never returns false, the output will be an empty iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/drop/~/drop drop} to drop a specific number of elements.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/take/~/take take} to take a specific number of elements.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/drop-while/~/dropWhile dropWhile} to drop elements synchronously.
 *
 * @param iterable The iterable to drop elements from.
 * @param fn The predicate function to drop elements with.
 * @returns The iterable with elements dropped while the predicate returns true.
 *
 * @example
 * ```ts
 * import { dropWhile } from "@core/iterutil/async/drop-while";
 *
 * const iter = dropWhile(
 *   [1, 2, 3, 4, 5],
 *   (v) => v < 3
 * );
 * console.log(await Array.fromAsync(iter)); // [3, 4, 5]
 * ```
 */
export async function* dropWhile<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): AsyncIterable<T> {
  let dropping = true;
  let index = 0;
  for await (const value of iterable) {
    if (dropping && await fn(value, index++)) {
      continue;
    }
    dropping = false;
    yield value;
  }
}
