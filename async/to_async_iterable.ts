/**
 * Converts an iterable to an async iterable.
 *
 * @param iterable The iterable to convert.
 * @returns The async iterable.
 *
 * @example
 * ```ts
 * import { toAsyncIterable } from "@core/iterutil/async/to-async-iterable";
 *
 * const iter = toAsyncIterable([1, 2, 3]);
 * console.log(await Array.fromAsync(iter)); // [1, 2, 3]
 * ```
 */
export async function* toAsyncIterable<T>(
  iterable: Iterable<T>,
): AsyncIterable<T> {
  yield* iterable;
}
