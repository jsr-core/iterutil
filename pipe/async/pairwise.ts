import { pairwise } from "../../async/pairwise.ts";

export {
  /**
   * An operator that pairs elements of an iterable.
   *
   * See {@linkcode https://jsr.io/@core/iterutil/doc/async/pairwise/~/pairwise pairwise} for native pairwise.
   *
   * @example
   * ```ts
   * import { pipe } from "@core/pipe";
   * import { pairwise } from "@core/iterutil/async/pairwise";
   *
   * const iter = pipe([1, 2, 3, 4, 5], pairwise);
   * console.log(await Array.fromAsync(iter)); // [[1, 2], [2, 3], [3, 4], [4, 5]]
   * ```
   */
  pairwise,
};
