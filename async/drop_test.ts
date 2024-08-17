import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { drop } from "./drop.ts";

await test("drop with async iterable with positive limit", async () => {
  const result = drop(toAsyncIterable([0, 1, 2, 3, 4]), 2);
  const expected = [2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("drop with async iterable with 0 limit", async () => {
  const result = drop(toAsyncIterable([0, 1, 2, 3, 4]), 0);
  const expected = [0, 1, 2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("drop with async iterable throws RangeError", () => {
  assertThrows(() => drop([], NaN), RangeError);
  assertThrows(() => drop([], Infinity), RangeError);
  assertThrows(() => drop([], -Infinity), RangeError);
  assertThrows(() => drop([], -1), RangeError);
  assertThrows(() => drop([], 1.1), RangeError);
});

await test("drop with iterable with positive limit", async () => {
  const result = drop([0, 1, 2, 3, 4], 2);
  const expected = [2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("drop with iterable with 0 limit", async () => {
  const result = drop([0, 1, 2, 3, 4], 0);
  const expected = [0, 1, 2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("drop with iterable throws RangeError", () => {
  assertThrows(() => drop([], NaN), RangeError);
  assertThrows(() => drop([], Infinity), RangeError);
  assertThrows(() => drop([], -Infinity), RangeError);
  assertThrows(() => drop([], -1), RangeError);
  assertThrows(() => drop([], 1.1), RangeError);
});
