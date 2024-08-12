import { last } from "@core/iterutil/async/last";

export {
  /**
   * An operator that gets the last element of an iterable.
   *
   * See {@linkcode https://jsr.io/@core/iterutil/doc/async/last/~/last last} for native last.
   *
   * @example
   * ```ts
   * import { pipe } from "@core/pipe";
   * import { last } from "@core/iterutil/pipe/async/last";
   *
   * const value = await pipe(
   *   [1, 2, 3],
   *   last
   * );
   * console.log(value); // 3
   * ```
   */
  last,
};
