import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { iter } from "./iter.ts";
import { take } from "./take.ts";

await test("take with async iterable with positive limit", async () => {
  const result = take(toAsyncIterable([0, 1, 2, 3, 4]), 2);
  const expected = [0, 1];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("take with async iterable with 0 limit", async () => {
  const result = take(toAsyncIterable([0, 1, 2, 3, 4]), 0);
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("take with iterable with positive limit", async () => {
  const result = take([0, 1, 2, 3, 4], 2);
  const expected = [0, 1];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("take with iterable with 0 limit", async () => {
  const result = take([0, 1, 2, 3, 4], 0);
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("take will stop consuming once limit items is taken", async () => {
  const it = iter([0, 1, 2, 3, 4]);
  const result = take(it, 3);
  const expected: number[] = [0, 1, 2];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  // Ensure the iterator is NOT fully consumed
  assertEquals(await Array.fromAsync(it), [3, 4]);
});

await test("take throws RangeError", () => {
  assertThrows(() => take([], NaN), RangeError);
  assertThrows(() => take([], Infinity), RangeError);
  assertThrows(() => take([], -Infinity), RangeError);
  assertThrows(() => take([], -1), RangeError);
  assertThrows(() => take([], 1.1), RangeError);
});
