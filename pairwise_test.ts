import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pairwise } from "./pairwise.ts";

await test("pairwise with non empty iterable", () => {
  const result = pairwise([1, 2, 3, 4, 5]);
  const expected = [[1, 2], [2, 3], [3, 4], [4, 5]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
});

await test("pairwise with single value iterable", () => {
  const result = pairwise([1]);
  const expected: number[][] = [];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
});

await test("pairwise with empty iterable", () => {
  const result = pairwise([] as number[]);
  const expected: number[][] = [];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
});
