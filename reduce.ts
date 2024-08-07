/**
 * Reduces an iterable into a single value.
 *
 * @param iterable The iterable to reduce.
 * @param fn The function to reduce with.
 * @returns The reduced value.
 *
 * @example
 * ```ts
 * import { reduce } from "@core/iterutil/reduce";
 *
 * const sum = reduce([1, 2, 3, 4, 5], (acc, value) => acc + value);
 * console.log(sum); // 15
 * ```
 */
export function reduce<T>(
  iter: Iterable<T>,
  fn: (acc: T, value: T, index: number) => T,
): T | undefined;

/**
 * Reduces an iterable into a single value.
 *
 * @param iterable The iterable to reduce.
 * @param fn The function to reduce with.
 * @param initial The initial value to start reducing with.
 * @returns The reduced value.
 *
 * @example
 * ```ts
 * import { reduce } from "@core/iterutil/reduce";
 *
 * const joined = reduce([1, 2, 3, 4, 5], (acc, value) => acc + value.toString(), "");
 * console.log(joined); // 12345
 * ```
 */
export function reduce<T, U>(
  iter: Iterable<T>,
  fn: (acc: U, value: T, index: number) => U,
  initial: U,
): U;

export function reduce<T, U = T>(
  iterable: Iterable<T>,
  fn: (acc: U, value: T, index: number) => U,
  initial?: U,
): U | undefined {
  const it = iterable[Symbol.iterator]();
  let index = 0;
  if (initial == null) {
    const { done, value } = it.next();
    if (done) {
      return undefined;
    }
    initial = value as unknown as U;
    index = 1;
  }
  let acc: U = initial;
  while (true) {
    const { done, value } = it.next();
    if (done) {
      break;
    }
    acc = fn(acc, value as T, index++);
  }
  return acc;
}
