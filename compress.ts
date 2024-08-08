/**
 * Compress an iterable by selecting elements using a selector iterable.
 *
 * @param iterable - The iterable to compress.
 * @param selectors - The selectors to use.
 * @returns The compressed iterable.
 *
 * @example
 * ```ts
 * import { compress } from "@core/iterutil/compress";
 *
 * const iter = compress([1, 2, 3, 4, 5], [true, false, true, false, true]);
 * console.log([...iter]); // [1, 3, 5]
 * ```
 *
 * ## See also
 * - {@link module:iterutil/async/compress.compress} for the asynchronous version.
 * - {@link module:iterutil/compact.compact} to remove nullish values from an iterable.
 * - {@link module:iterutil/filter.filter} to remove values based on a predicate.
 */
export function* compress<T>(
  iterable: Iterable<T>,
  selectors: Iterable<boolean>,
): Iterable<T> {
  const it1 = iterable[Symbol.iterator]();
  const it2 = selectors[Symbol.iterator]();
  while (true) {
    const { done: done1, value: value1 } = it1.next();
    const { done: done2, value: value2 } = it2.next();
    if (done1 || done2) {
      break;
    }
    if (value2) {
      yield value1;
    }
  }
}
