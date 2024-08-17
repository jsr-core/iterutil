import { enumerate as base } from "../../async/enumerate.ts";

/**
 * Returns an operator that enumerates the iterable.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/enumerate/~/enumerate enumerate} for native enumerate.
 *
 * @param start The starting index.
 * @param step The step between indices.
 * @returns An operator that enumerates the iterable.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { enumerate } from "@core/iterutil/pipe/async/enumerate";
 *
 * const iter1 = pipe(
 *   ["a", "b", "c"],
 *   enumerate(),
 * );
 * console.log(await Array.fromAsync(iter1)); // [[0, "a"], [1, "b"], [2, "c"]]
 *
 * const iter2 = pipe(
 *   ["a", "b", "c"],
 *   enumerate(1),
 * );
 * console.log(await Array.fromAsync(iter2)); // [[1, "a"], [2, "b"], [3, "c"]]
 *
 * const iter3 = pipe(
 *   ["a", "b", "c"],
 *   enumerate(1, 2),
 * );
 * console.log(await Array.fromAsync(iter3)); // [[1, "a"], [3, "b"], [5, "c"]]
 * ```
 */
export function enumerate(
  start: number = 0,
  step: number = 1,
): <T>(iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<[number, T]> {
  return (iterable) => base(iterable, start, step);
}
