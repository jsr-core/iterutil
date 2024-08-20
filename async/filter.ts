export function filter<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): AsyncIterable<T>;
export function filter<T, U extends T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => value is U,
): AsyncIterable<U>;
/**
 * Filters an iterable based on a function.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/compact/~/compact compact} to remove nullish values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/compress/~/compress compress} to remove values based on an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/map/~/map map} to transform the values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/reduce/~/reduce reduce} to reduce the values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/filter/~/filter filter} to filter synchronously.
 *
 * @params iterable The iterable to filter.
 * @params fn The function to filter with.
 * @returns The filtered iterable.
 *
 * @example
 * ```ts
 * import { filter } from "@core/iterutil/async/filter";
 *
 * const iter = filter(
 *   [1, 2, 3, 4, 5],
 *   (v) => v % 2 === 0,
 * );
 * console.log(await Array.fromAsync(iter)); // [2, 4]
 * ```
 */
export async function* filter<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (value: T, index: number) => boolean | Promise<boolean>,
): AsyncIterable<T> {
  let index = 0;
  for await (const value of iterable) {
    if (await fn(value, index++)) {
      yield value;
    }
  }
}
