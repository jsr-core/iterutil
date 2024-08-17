/**
 * Returns a finite iterable that repeats through the given iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/cycle/~/cycle cycle} to cycle the iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/repeat/~/repeat repeat} to repeat the iterable asynchronously.
 *
 * @param iterable The iterable to repeat.
 * @param n The number of times to repeat the iterable. Must be a safe integer greater than or equal to 0
 * @returns The repeated iterable.
 * @throws {RangeError} If `n` is not a safe integer greater than or equal to 0.
 *
 * @example
 * ```ts
 * import { repeat } from "@core/iterutil/repeat";
 *
 * const iter = repeat([1, 2, 3], 2);
 * console.log(Array.from(iter)); // [1, 2, 3, 1, 2, 3]
 * ```
 */
export function repeat<T>(iterable: Iterable<T>, n: number): Iterable<T> {
  if (n < 0 || !Number.isSafeInteger(n)) {
    throw new RangeError(
      `n must be 0 or positive safe integer, but got ${n}.`,
    );
  }
  if (n === 0) {
    return [];
  }
  return function* () {
    const array = Array.from(iterable);
    if (array.length === 0) {
      return;
    }
    for (let i = 0; i < n; i++) {
      yield* array;
    }
  }();
}
