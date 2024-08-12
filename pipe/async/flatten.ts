import { flatten } from "@core/iterutil/async/flatten";

export {
  /**
   * An operator that flattens an iterable of iterables.
   *
   * See {@linkcode https://jsr.io/@core/iterutil/doc/async/flatten/~/flatten flatten} for native flatten.
   *
   * @example
   * ```ts
   * import { pipe } from "@core/pipe";
   * import { flatten } from "@core/iterutil/pipe/async/flatten";
   *
   * const iter = pipe(
   *   [[1, 2], [3, 4], [5]],
   *   flatten,
   * );
   * console.log(await Array.fromAsync(iter)); // [1, 2, 3, 4, 5]
   * ```
   */
  flatten,
};
