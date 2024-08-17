import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { find } from "./find.ts";

await test("find found", () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = find([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v % 2 === 0;
  });
  const expected = 2;
  assertEquals(result, expected);
  assertEquals(values, [1, 2]);
  assertEquals(indices, [0, 1]);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("find not found", () => {
  const result = find([1, 2, 3, 4, 5], () => false);
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});
