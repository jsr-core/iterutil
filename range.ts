/**
 * Generate a range of numbers.
 *
 * @param stop The end of the range.
 * @returns The range of numbers.
 *
 * @example
 * ```ts
 * import { range } from "@core/iterutil/range";
 *
 * console.log(Array.from(range(3))); // [0, 1, 2]
 * ```
 */
export function range(stop: number): Iterable<number>;
/**
 * Generate a range of numbers.
 *
 * @param start The start of the range.
 * @param stop The end of the range.
 * @returns The range of numbers.
 *
 * @example
 * ```ts
 * import { range } from "@core/iterutil/range";
 *
 * console.log(Array.from(range(1, 6, 2))); // [1, 3, 5]
 * ```
 */
export function range(
  start: number,
  stop: number,
  step?: number,
): Iterable<number>;
export function* range(
  startOrStop: number,
  stop?: number,
  step: number = 1,
): Iterable<number> {
  if (!stop) {
    yield* range(0, startOrStop);
  } else {
    for (let i = startOrStop; i < stop; i += step) {
      yield i;
    }
  }
}
