import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { first } from "./first.ts";

await test("first with non empty iterable", () => {
  const result = first([1, 2, 3, 4, 5]);
  const expected = 1;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("first with empty iterable", () => {
  const result = first([] as number[]);
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});
