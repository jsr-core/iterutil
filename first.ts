/**
 * Returns the first element of an iterable. If the iterable is empty, returns `undefined`.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/last last} to get the last element of an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/find find} to get the first element that matches a predicate.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/first first} to get the first element asynchronously.
 *
 * @param iterable The iterable to get the first element from.
 * @returns The first element of the iterable, or `undefined` if the iterable is empty.
 *
 * @example
 * ```ts
 * import { first } from "@core/iterutil/first";
 *
 * const result = first([1, 2, 3]);
 * console.log(result); // 1
 * ```
 */
export function first<T>(iterable: Iterable<T>): T | undefined {
  for (const value of iterable) {
    return value;
  }
  return undefined;
}
