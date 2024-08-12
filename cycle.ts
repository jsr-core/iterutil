/**
 * Returns an infinite iterable that cycles through the given iterable.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/take take} to limit the number of items of the cycled iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/~/async/cycle cycle} to cycle the iterable asynchronously.
 *
 * @param iterable The iterable to cycle.
 * @returns The cycled iterable.
 *
 * @example
 * ```ts
 * import { cycle } from "@core/iterutil/cycle";
 * import { take } from "@core/iterutil/take";
 *
 * const iter = cycle([1, 2, 3]);
 * console.log(Array.from(take(iter, 5))); // [1, 2, 3, 1, 2]
 * ```
 */
export function* cycle<T>(iterable: Iterable<T>): Iterable<T> {
  const array = Array.from(iterable);
  if (array.length === 0) {
    return;
  }
  while (true) {
    yield* array;
  }
}
