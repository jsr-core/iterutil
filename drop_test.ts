import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { drop } from "./drop.ts";

await test("drop with positive limit", () => {
  const result = drop([0, 1, 2, 3, 4], 2);
  const expected = [2, 3, 4];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("drop with 0 limit", () => {
  const result = drop([0, 1, 2, 3, 4], 0);
  const expected = [0, 1, 2, 3, 4];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("drop throws RangeError", () => {
  assertThrows(() => drop([], NaN), RangeError);
  assertThrows(() => drop([], Infinity), RangeError);
  assertThrows(() => drop([], -Infinity), RangeError);
  assertThrows(() => drop([], -1), RangeError);
  assertThrows(() => drop([], 1.1), RangeError);
});
