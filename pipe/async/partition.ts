import { partition as base } from "../../async/partition.ts";

/**
 * Returns an operator that partitions the iterable using the provided function.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/async/partition/~/partition partition} for native partition.
 *
 * @param selector The function to partition with.
 * @returns An operator that partitions the iterable using the provided function.
 *
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { partition } from "@core/iterutil/pipe/async/partition";
 *
 * const [even, odd] = await pipe(
 *   [1, 2, 3, 4, 5],
 *   partition((v) => v % 2 === 0),
 * );
 * console.log(even); // [2, 4]
 * console.log(odd); // [1, 3, 5]
 * ```
 */
export function partition<T>(
  selector: (value: T, index: number) => boolean | Promise<boolean>,
): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<[T[], T[]]> {
  return (iterable) => base(iterable, selector);
}
