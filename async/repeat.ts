/**
 * Returns an infinite iterable that repeats through the given iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/cycle/~/cycle cycle} to cycle the iterable
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/repeat/~/repeat repeat} to repeat the iterable synchronously.
 *
 * @param iterable The iterable to repeat.
 * @returns The repeatd iterable.
 *
 * @example
 * ```ts
 * import { repeat } from "@core/iterutil/async/repeat";
 *
 * const iter = repeat([1, 2, 3], 2);
 * console.log(await Array.fromAsync(iter)); // [1, 2, 3, 1, 2, 3]
 * ```
 */
export function repeat<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  n: number,
): AsyncIterable<T> {
  if (n < 0 || !Number.isSafeInteger(n)) {
    throw new RangeError(
      `n must be 0 or positive safe integer, but got ${n}.`,
    );
  }
  if (n === 0) {
    return async function* () {}();
  }
  return async function* () {
    const array = await Array.fromAsync(iterable);
    if (array.length === 0) {
      return;
    }
    for (let i = 0; i < n; i++) {
      yield* array;
    }
  }();
}
