import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { repeat } from "./repeat.ts";

await test("repeat with non empty iterable", () => {
  const result = repeat([0, 1, 2], 2);
  const expected = [0, 1, 2, 0, 1, 2];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("repeat with single value iterable", () => {
  const result = repeat([0], 2);
  const expected = [0, 0];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("repeat with empty iterable", () => {
  const result = repeat([] as number[], 2);
  const expected: number[] = [];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("repeat with n=0", () => {
  const result = repeat([0, 1, 2], 0);
  const expected: number[] = [];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("repeat throws RangeError", () => {
  assertThrows(() => repeat([], NaN), RangeError);
  assertThrows(() => repeat([], Infinity), RangeError);
  assertThrows(() => repeat([], -Infinity), RangeError);
  assertThrows(() => repeat([], -1), RangeError);
  assertThrows(() => repeat([], 1.1), RangeError);
});
