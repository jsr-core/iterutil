import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { reverse } from "./reverse.ts";

await test("reverse with non empty iterable", () => {
  const result = reverse([1, 2, 3, 4, 5] as const);
  const expected = [5, 4, 3, 2, 1] as const;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, Iterable<[5, 4, 3, 2, 1]>>>(true);
});

await test("reverse with empty iterable", () => {
  const result = reverse([] as number[]);
  const expected = [];
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number[]>>(true);
});
