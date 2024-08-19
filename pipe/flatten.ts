import { flatten } from "../flatten.ts";

export {
  /**
   * An operator that flattens an iterable of iterables.
   *
   * See {@linkcode https://jsr.io/@core/iterutil/doc/flatten/~/flatten flatten} for native flatten.
   *
   * @example
   * ```ts
   * import { pipe } from "@core/pipe";
   * import { flatten } from "@core/iterutil/pipe/flatten";
   *
   * const iter = pipe(
   *   [[1, 2], [3, 4], [5]],
   *   flatten,
   * );
   * console.log(Array.from(iter)); // [1, 2, 3, 4, 5]
   * ```
   */
  flatten,
};
