import { cycle } from "../cycle.ts";

export {
  /**
   * An operator to return a function that cycles the elements of an iterable.
   *
   * See {@linkcode https://jsr.io/@core/iterutil/doc/cycle/~/cycle cycle} for native cycle.
   *
   * @example
   * ```ts
   * import { pipe } from "@core/pipe";
   * import { cycle } from "@core/iterutil/pipe/cycle";
   * import { take } from "@core/iterutil/pipe/take";
   *
   * const iter = pipe(
   *   [1, 2, 3],
   *   cycle,
   *   take(5),
   * );
   * console.log(Array.from(iter)); // [1, 2, 3, 1, 2]
   * ```
   */
  cycle,
};
