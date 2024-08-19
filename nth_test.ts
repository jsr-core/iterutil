import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { nth } from "./nth.ts";

await test("nth with non empty iterable", () => {
  const result = nth([1, 2, 3, 4, 5], 2);
  const expected = 3;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("nth with empty iterable", () => {
  const result = nth([] as number[], 2);
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("nth throws RangeError", () => {
  assertThrows(() => nth([], NaN), RangeError);
  assertThrows(() => nth([], Infinity), RangeError);
  assertThrows(() => nth([], -Infinity), RangeError);
  assertThrows(() => nth([], -1), RangeError);
  assertThrows(() => nth([], 1.1), RangeError);
});
