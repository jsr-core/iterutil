/**
 * Returns the n-th element of an iterable. If the length of the iterable is less, returns `undefined`.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/first/~/first first} to get the first element of an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/last/~/last last} to get the last element of an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/find/~/find find} to get the first element that matches a predicate.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/nth/~/nth nth} to get the n-th element asynchronously.
 *
 * @param iterable The iterable to get the first element from.
 * @param index The index of the element to get (0-based).
 * @returns The first element of the iterable, or `undefined` if the iterable is empty.
 * @throws {RangeError} If `index` is not zero nor a positive safe integer.
 *
 * @example
 * ```ts
 * import { nth } from "@core/iterutil/nth";
 *
 * const result = nth([1, 2, 3], 1);
 * console.log(result); // 2
 * ```
 */
export function nth<T>(iterable: Iterable<T>, index: number): T | undefined {
  if (index < 0 || !Number.isSafeInteger(index)) {
    throw new RangeError(
      `index must be 0 or positive safe integer, but got ${index}.`,
    );
  }
  let i = 0;
  for (const value of iterable) {
    if (index === i++) {
      return value;
    }
  }
  return undefined;
}
