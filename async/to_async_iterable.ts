/**
 * Converts an iterable to an async iterable.
 *
 * @param iterable The iterable to convert.
 * @returns The async iterable.
 *
 * @example
 * ```ts
 * import { toArray } from "@core/iterutil/async/to-array";
 * import { toAsyncIterable } from "@core/iterutil/async/to-async-iterable";
 *
 * const iter = toAsyncIterable([1, 2, 3]);
 * console.log(await toArray(iter)); // [1, 2, 3]
 * ```
 */
export async function* toAsyncIterable<T>(
  iterable: Iterable<T>,
): AsyncIterable<T> {
  yield* iterable;
}
