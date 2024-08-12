import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { flatMap } from "./flat_map.ts";

Deno.test("flatMap", async (t) => {
  await t.step("single nest", () => {
    const values: number[] = [];
    const indices: number[] = [];
    const result = flatMap([1, 2, 3, 4, 5], (value, index) => {
      values.push(value);
      indices.push(index);
      return [value, value];
    });
    const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    assertEquals(Array.from(result), expected);
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("multi nest", () => {
    const result = flatMap([1, 2, 3, 4, 5], (v) => [[v, v]]);
    const expected = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number[]>>>(true);
  });
});
