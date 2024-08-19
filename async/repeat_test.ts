import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { repeat } from "./repeat.ts";

await test("repeat with async iterable with non empty iterable", async () => {
  const result = repeat(toAsyncIterable([0, 1, 2]), 2);
  const expected = [0, 1, 2, 0, 1, 2];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("repeat with async iterable with single value iterable", async () => {
  const result = repeat(toAsyncIterable([0]), 2);
  const expected = [0, 0];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("repeat with async iterable with empty iterable", async () => {
  const result = repeat(toAsyncIterable([] as number[]), 2);
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("repeat with iterable with non empty iterable", async () => {
  const result = repeat([0, 1, 2], 2);
  const expected = [0, 1, 2, 0, 1, 2];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("repeat with iterable with single value iterable", async () => {
  const result = repeat([0], 2);
  const expected = [0, 0];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("repeat with iterable with empty iterable", async () => {
  const result = repeat([] as number[], 2);
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("repeat with n=0", async () => {
  const result = repeat([0, 1, 2], 0);
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("repeat throws RangeError", () => {
  assertThrows(() => repeat([], NaN), RangeError);
  assertThrows(() => repeat([], Infinity), RangeError);
  assertThrows(() => repeat([], -Infinity), RangeError);
  assertThrows(() => repeat([], -1), RangeError);
  assertThrows(() => repeat([], 1.1), RangeError);
});
