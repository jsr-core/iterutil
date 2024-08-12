import { cycle } from "@core/iterutil/async/cycle";

export {
  /**
   * An operator to return a function that cycles the elements of an iterable.
   *
   * See {@linkcode https://jsr.io/@core/iterutil/doc/async/cycle/~/cycle cycle} for native cycle.
   *
   * @example
   * ```ts
   * import { pipe } from "@core/pipe";
   * import { cycle } from "@core/iterutil/pipe/async/cycle";
   * import { take } from "@core/iterutil/pipe/async/take";
   *
   * const iter = pipe(
   *   [1, 2, 3],
   *   cycle,
   *   take(5),
   * );
   * console.log(await Array.fromAsync(iter)); // [1, 2, 3, 1, 2]
   * ```
   */
  cycle,
};
