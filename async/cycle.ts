/**
 * Returns an infinite iterable that cycles through the given iterable.
 *
 * @param iterable The iterable to cycle.
 * @returns The cycled iterable.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { cycle } from "@core/iterutil/async/cycle";
 * import { take } from "@core/iterutil/async/take";
 *
 * const iter = cycle([1, 2, 3]);
 * console.log(await toArray(take(iter, 5))); // [1, 2, 3, 1, 2]
 * ```
 */
export async function* cycle<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): AsyncIterable<T> {
  const array: T[] = [];
  for await (const item of iterable) {
    array.push(item);
  }
  if (array.length === 0) {
    return;
  }
  while (true) {
    yield* array;
  }
}
