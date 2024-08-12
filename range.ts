/**
 * Generate a range of numbers.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/count count} to generate an infinite range.
 *
 * @param start The start of the range.
 * @param stop The end of the range.
 * @param step The step between each number in the range.
 * @returns The range iterable.
 * @throws {RangeError} if `start`, `stop`, or `step` is not finite or `step` is 0, or `start` is greater than `stop` for positive step or `start` is less than `stop` for negative step.
 *
 * @example
 * ```ts
 * import { range } from "@core/iterutil/range";
 *
 * console.log(Array.from(range(1, 3))); // [1, 2, 3]
 * console.log(Array.from(range(1, 6, 2))); // [1, 3, 5]
 * ```
 */
export function range(
  start: number,
  stop: number,
  step?: number,
): Iterable<number> {
  step ??= start > stop ? -1 : 1;
  if (!Number.isFinite(start)) {
    throw new RangeError(`start must be finite, but got ${start}.`);
  }
  if (!Number.isFinite(step)) {
    throw new RangeError(`step must be finite, but got ${step}.`);
  }
  if (step === 0) {
    throw new RangeError(`step must not be 0.`);
  }
  if (!Number.isFinite(stop)) {
    throw new RangeError(`stop must be finite, but got ${stop}.`);
  }
  if (step > 0 && start > stop) {
    throw new RangeError(`start must be less than stop for positive step.`);
  }
  if (step < 0 && start < stop) {
    throw new RangeError(`start must be greater than stop for negative step.`);
  }
  return function* () {
    if (step >= 0) {
      for (let i = start; i <= stop; i += step) {
        yield i;
      }
    } else {
      for (let i = start; i >= stop; i += step) {
        yield i;
      }
    }
  }();
}
