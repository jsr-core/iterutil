/**
 * Returns an iterable of index-value pairs.
 *
 * The index starts at `start` and increments by `step` for each value.
 * If `start` is not provided, it defaults to `0`.
 * If `step` is not provided, it defaults to `1`.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/zip zip} to zip iterable with other iterables.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/count count} to generate an infinite sequence of numbers.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/enumerate enumerate} to enumerate asynchronously.
 *
 * @param iterable The iterable to enumerate.
 * @param start The starting index.
 * @param step The step between indices.
 * @returns An iterable of index-value pairs.
 * @throws {RangeError} if `start` or `step` is not finite or `step` is 0.
 *
 * @example
 * ```ts
 * import { enumerate } from "@core/iterutil/enumerate";
 *
 * const iter1 = enumerate(["a", "b", "c"]);
 * console.log(Array.from(iter1)); // [[0, "a"], [1, "b"], [2, "c"]]
 *
 * const iter2 = enumerate(["a", "b", "c"], 1);
 * console.log(Array.from(iter2)); // [[1, "a"], [2, "b"], [3, "c"]]
 *
 * const iter3 = enumerate(["a", "b", "c"], 1, 2);
 * console.log(Array.from(iter3)); // [[1, "a"], [3, "b"], [5, "c"]]
 * ```
 */
export function enumerate<T>(
  iterable: Iterable<T>,
  start: number = 0,
  step: number = 1,
): Iterable<[number, T]> {
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
    for (const value of iterable) {
      yield [i, value];
      i += step;
    }
  }();
}
