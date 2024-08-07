/**
 * Partitions an iterable into two arrays based on a selector function.
 *
 * @param iterable The iterable to partition.
 * @param selector The function to partition with.
 * @returns The partitioned arrays.
 *
 * @example
 * ```ts
 * import { partition } from "@core/iterutil/partition";
 *
 * const [even, odd] = partition([1, 2, 3, 4, 5], (value) => value % 2 === 0);
 * console.log(even); // [2, 4]
 * console.log(odd); // [1, 3, 5]
 * ```
 */
export function partition<T>(
  iterable: Iterable<T>,
  selector: (value: T, index: number) => boolean,
): [T[], T[]] {
  let index = 0;
  const [a, b]: [T[], T[]] = [[], []];
  for (const value of iterable) {
    if (selector(value, index++)) {
      a.push(value);
    } else {
      b.push(value);
    }
  }
  return [a, b];
}
