/**
 * Reduces an iterable into a single value.
 *
 * @param iterable The iterable to reduce.
 * @param fn The function to reduce with.
 * @returns The reduced value.
 *
 * @example
 * ```ts
 * import { reduce } from "@core/iterutil/async/reduce";
 *
 * const sum = await reduce([1, 2, 3, 4, 5], (acc, value) => acc + value);
 * console.log(sum); // 15
 * ```
 */
export function reduce<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (acc: T, value: T, index: number) => T | Promise<T>,
): Promise<T | undefined>;

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
 * import { reduce } from "@core/iterutil/async/reduce";
 *
 * const joined = await reduce([1, 2, 3, 4, 5], (acc, value) => acc + value.toString(), "");
 * console.log(joined); // 12345
 * ```
 */
export function reduce<T, U>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (acc: U, value: T, index: number) => U | Promise<U>,
  initial: U,
): Promise<U>;

export async function reduce<T, U = T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  fn: (acc: U, value: T, index: number) => U | Promise<U>,
  initial?: U,
): Promise<U | undefined> {
  const it = Symbol.iterator in iterable
    ? iterable[Symbol.iterator]()
    : iterable[Symbol.asyncIterator]();
  let index = 0;
  if (initial == null) {
    const { done, value } = await it.next();
    if (done) {
      return undefined;
    }
    initial = value as unknown as U;
    index = 1;
  }
  let acc: U = initial;
  while (true) {
    const { done, value } = await it.next();
    if (done) {
      break;
    }
    acc = await fn(acc, value as T, index++);
  }
  return acc;
}
