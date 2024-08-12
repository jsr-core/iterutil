/**
 * Returns an infinite iterable that cycles through the given iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/async/take take} to limit the number of items of the cycled iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/cycle cycle} to cycle the iterable synchronously.
 *
 * @param iterable The iterable to cycle.
 * @returns The cycled iterable.
 *
 * @example
 * ```ts
 * import { cycle } from "@core/iterutil/async/cycle";
 * import { take } from "@core/iterutil/async/take";
 *
 * const iter = cycle([1, 2, 3]);
 * console.log(await Array.fromAsync(take(iter, 5))); // [1, 2, 3, 1, 2]
 * ```
 */
export async function* cycle<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): AsyncIterable<T> {
  const array = await Array.fromAsync(iterable);
  if (array.length === 0) {
    return;
  }
  while (true) {
    yield* array;
  }
}
