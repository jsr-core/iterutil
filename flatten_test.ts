import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { flatten } from "./flatten.ts";

await test("flatten single nest", () => {
  const result = flatten([[1, 2], [3, 4], [5]]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("flatten multi nest", () => {
  const result = flatten([[[1, 2], [3, 4]], [[5]]]);
  const expected = [[1, 2], [3, 4], [5]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number[]>>>(true);
});
