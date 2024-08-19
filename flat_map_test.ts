import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { flatMap } from "./flat_map.ts";

await test("flatMap single nest", () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = flatMap([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return [v, v];
  });
  const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  assertEquals(Array.from(result), expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("flatMap multi nest", () => {
  const result = flatMap([1, 2, 3, 4, 5], (v) => [[v, v]]);
  const expected = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number[]>>>(true);
});
