export function filter<T>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => boolean,
): Iterable<T>;
export function filter<T, U extends T>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => value is U,
): Iterable<U>;
/**
 * Filters an iterable based on a function.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/compact/~/compact compact} to remove nullish values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/compress/~/compress compress} to remove values based on an iterable.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/map/~/map map} to transform the values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/reduce/~/reduce reduce} to reduce the values.
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/async/filter/~/filter filter} to filter asynchronously.
 *
 * @params iterable The iterable to filter.
 * @params fn The function to filter with.
 * @returns The filtered iterable.
 *
 * @example
 * ```ts
 * import { filter } from "@core/iterutil/filter";
 *
 * const iter = filter(
 *   [1, 2, 3, 4, 5],
 *   (v) => v % 2 === 0
 * );
 * console.log(Array.from(iter)); // [2, 4]
 * ```
 */
export function* filter<T>(
  iterable: Iterable<T>,
  fn: (value: T, index: number) => boolean,
): Iterable<T> {
  let index = 0;
  for (const value of iterable) {
    if (fn(value, index++)) {
      yield value;
    }
  }
}
