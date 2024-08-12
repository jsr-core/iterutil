/**
 * Partitions an iterable into two arrays based on a selector function.
 *
 * Use {@linkcode https://jsr.io/@core/iterutil/doc/partition/~/partition partition} to partition synchronously.
 *
 * @param iterable The iterable to partition.
 * @param selector The function to partition with.
 * @returns The partitioned arrays.
 *
 * @example
 * ```ts
 * import { partition } from "@core/iterutil/async/partition";
 *
 * const [even, odd] = await partition(
 *   [1, 2, 3, 4, 5],
 *   (v) => v % 2 === 0,
 * );
 * console.log(even); // [2, 4]
 * console.log(odd); // [1, 3, 5]
 * ```
 */
export async function partition<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
  selector: (value: T, index: number) => boolean | Promise<boolean>,
): Promise<[T[], T[]]> {
  let index = 0;
  const [a, b]: [T[], T[]] = [[], []];
  for await (const value of iterable) {
    if (await selector(value, index++)) {
      a.push(value);
    } else {
      b.push(value);
    }
  }
  return [a, b];
}
