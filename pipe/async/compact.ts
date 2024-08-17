import { compact } from "../../async/compact.ts";

export {
  /**
   * An operator to remove all nullish (`null` or `undefined`) values from an iterable.
   *
   * See {@linkcode https://jsr.io/@core/iterutil/doc/async/compact/~/compact compact} for native compact.
   *
   * @example
   * ```ts
   * import { pipe } from "@core/pipe";
   * import { compact } from "@core/iterutil/pipe/async/compact";
   *
   * const iter = pipe(
   *   [1, undefined, 2, null, 3],
   *   compact,
   * );
   * console.log(await Array.fromAsync(iter)); // [1, 2, 3]
   * ```
   */
  compact,
};
