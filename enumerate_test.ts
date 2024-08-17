import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { enumerate } from "./enumerate.ts";

await test("enumerate default", () => {
  const result = enumerate([0, 1, 2]);
  const expected = [[0, 0], [1, 1], [2, 2]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
});

await test("enumerate with positive start", () => {
  const result = enumerate([0, 1, 2], 1);
  const expected = [[1, 0], [2, 1], [3, 2]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
});

await test("enumerate with negative start", () => {
  const result = enumerate([0, 1, 2], -1);
  const expected = [[-1, 0], [0, 1], [1, 2]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
});

await test("enumerate with float start", () => {
  const result = enumerate([0, 1, 2], 1.1);
  const expected = [[1.1, 0], [2.1, 1], [3.1, 2]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
});

await test("enumerate with start and positive step", () => {
  const result = enumerate([0, 1, 2], 1, 2);
  const expected = [[1, 0], [3, 1], [5, 2]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
});

await test("enumerate with start and negative step", () => {
  const result = enumerate([0, 1, 2], 1, -1);
  const expected = [[1, 0], [0, 1], [-1, 2]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
});

await test("enumerate with start and float step", () => {
  const result = enumerate([0, 1, 2], 1, 0.2);
  const expected = [[1, 0], [1.2, 1], [1.4, 2]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
});

await test("enumerate throws RangeError if the start is not finite", () => {
  assertThrows(() => enumerate([], NaN), RangeError);
  assertThrows(() => enumerate([], Infinity), RangeError);
  assertThrows(() => enumerate([], -Infinity), RangeError);
});

await test("enumerate throws RangeError if the step is not finite", () => {
  assertThrows(() => enumerate([], 0, NaN), RangeError);
  assertThrows(() => enumerate([], 0, Infinity), RangeError);
  assertThrows(() => enumerate([], 0, -Infinity), RangeError);
});

await test("enumerate throws RangeError if the step is 0", () => {
  assertThrows(() => enumerate([], 0, 0), RangeError);
});
