/**
 * Generates an infinite sequence of numbers starting from `start` with a step of `step`.
 *
 * @param - start The number to start the sequence from.
 * @param - step The step between each number in the sequence.
 * @returns The count iterable.
 * @see {@link module:iterutil/take.take} to take a specific number of elements from the iterable.
 * @see {@link module:iterutil/range.range} for a finite version of this function.
 *
 * @example
 * ```ts
 * import { count } from "@core/iterutil/count";
 * import { take } from "@core/iterutil/take";
 *
 * const iter = count(1, 2);
 * console.log([...take(iter, 5)]); // [1, 3, 5, 7, 9]
 * ```
 */
export function* count(start: number = 0, step: number = 1): Iterable<number> {
  let i = start;
  while (true) {
    yield i;
    i += step;
  }
}
