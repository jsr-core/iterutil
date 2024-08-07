/**
 * Returns the first element of an iterable.
 * If the iterable is empty, returns `undefined`.
 *
 * @param iterable The iterable to get the first element from.
 * @returns The first element of the iterable, or `undefined` if the iterable is empty.
 *
 * @example
 * ```ts
 * import { first } from "@core/iterutil/async/first";
 *
 * const value = await first([1, 2, 3]);
 * console.log(value); // 1
 * ```
 */
export async function first<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): Promise<T | undefined> {
  for await (const value of iterable) {
    return value;
  }
  return undefined;
}
