import { first } from "@core/iterutil/first";

export {
  /**
   * An operator that gets the first element of an iterable.
   *
   * See {@linkcode https://jsr.io/@core/iterutil/doc/first/~/first first} for native first.
   *
   * @example
   * ```ts
   * import { pipe } from "@core/pipe";
   * import { first } from "@core/iterutil/pipe/first";
   *
   * const value = pipe(
   *   [1, 2, 3],
   *   first,
   * );
   * console.log(value); // 1
   * ```
   */
  first,
};
