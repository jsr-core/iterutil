import { first } from "@core/iterutil/async/first";

export {
  /**
   * An operator that gets the first element of an iterable.
   *
   * See {@linkcode https://jsr.io/@core/iterutil/doc/async/first/~/first first} for native first.
   *
   * @example
   * ```ts
   * import { pipe } from "@core/pipe";
   * import { first } from "@core/iterutil/pipe/async/first";
   *
   * const value = await pipe(
   *   [1, 2, 3],
   *   first,
   * );
   * console.log(value); // 1
   * ```
   */
  first,
};
