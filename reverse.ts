/**
  * Returns the elements of an iterable in reverse order.
  *
  * @param iterable The iterable to reverse.
  * @returns The elements of the iterable in reverse order.
  *
  * @example
  * ```ts
  * import { reverse } from "@core/iterutil/reverse";
  *
  * console.log([...reverse([1, 2, 3)]); // [3, 2, 1]
  * console.log([...reverse([])]); // []
  * ```
  */
export function reverse<T>(iterable: Iterable<T>): Iterable<T> {
  return {
    *[Symbol.iterator]() {
      const array = [...iterable];
      for (let i = array.length - 1; i >= 0; i--) {
        yield array[i];
      }
    },
  };
}
