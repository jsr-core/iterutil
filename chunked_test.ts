import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { chunked } from "./chunked.ts";

await test("chunked the length is divisible by the size", () => {
  const result = chunked([1, 2, 3, 4, 5, 6], 2);
  const expected = [[1, 2], [3, 4], [5, 6]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number[]>>>(true);
});

await test("chunked the length is not divisible by the size", () => {
  const result = chunked([1, 2, 3, 4, 5], 2);
  const expected = [[1, 2], [3, 4], [5]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number[]>>>(true);
});

await test("chunked the length is equal to the size", () => {
  const result = chunked([1, 2, 3, 4, 5], 5);
  const expected = [[1, 2, 3, 4, 5]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number[]>>>(true);
});

await test("chunked the length is less than the size", () => {
  const result = chunked([1, 2, 3, 4, 5], 6);
  const expected = [[1, 2, 3, 4, 5]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number[]>>>(true);
});

await test("chunked throws RangeError", () => {
  assertThrows(() => chunked([], NaN), RangeError);
  assertThrows(() => chunked([], Infinity), RangeError);
  assertThrows(() => chunked([], -Infinity), RangeError);
  assertThrows(() => chunked([], -1), RangeError);
  assertThrows(() => chunked([], 1.1), RangeError);
  assertThrows(() => chunked([], 0), RangeError);
});
