/**
 * Generates an infinite sequence of numbers starting from `start` with a step of `step`.
 *
 * The sequence starts from `start` and increments by `step` for each number.
 * If `start` is not provided, it defaults to `0`.
 * If `step` is not provided, it defaults to `1`.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/take take} to limit the number of items.
 * Use {@linkcode https://jsr.io/@core/iterutil/range range} to generate a sequence of numbers within a range.
 *
 * @param start The number to start the sequence from.
 * @param step The step between each number in the sequence.
 * @returns The count iterable.
 * @throws {RangeError} if `start` or `step` is not finite or `step` is 0.
 *
 * @example
 * ```ts
 * import { count } from "@core/iterutil/count";
 * import { take } from "@core/iterutil/take";
 *
 * const iter = count(1, 2);
 * console.log(Array.from(take(iter, 5))); // [1, 3, 5, 7, 9]
 * ```
 */
export function count(start: number = 0, step: number = 1): Iterable<number> {
  if (!Number.isFinite(start)) {
    throw new RangeError(`start must be finite, but got ${start}.`);
  }
  if (!Number.isFinite(step)) {
    throw new RangeError(`step must be finite, but got ${step}.`);
  }
  if (step === 0) {
    throw new RangeError(`step must not be 0.`);
  }
  return function* () {
    let i = start;
    while (true) {
      yield i;
      i += step;
    }
  }();
}
