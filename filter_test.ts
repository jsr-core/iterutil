import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { filter } from "./filter.ts";

Deno.test("filter", () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = filter([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v % 2 === 0;
  });
  const expected = [2, 4];
  assertEquals(Array.from(result), expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
