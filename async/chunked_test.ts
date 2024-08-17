import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { chunked } from "./chunked.ts";

await test("chunked with async iterable the length is divisible by the size", async () => {
  const result = chunked(toAsyncIterable([1, 2, 3, 4, 5, 6]), 2);
  const expected = [[1, 2], [3, 4], [5, 6]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});

await test("chunked with async iterable the length is not divisible by the size", async () => {
  const result = chunked(toAsyncIterable([1, 2, 3, 4, 5]), 2);
  const expected = [[1, 2], [3, 4], [5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});

await test("chunked with async iterable the length is equal to the size", async () => {
  const result = chunked(toAsyncIterable([1, 2, 3, 4, 5]), 5);
  const expected = [[1, 2, 3, 4, 5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});

await test("chunked with async iterable the length is less than the size", async () => {
  const result = chunked(toAsyncIterable([1, 2, 3, 4, 5]), 6);
  const expected = [[1, 2, 3, 4, 5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});

await test("chunked with async iterable throws RangeError", () => {
  assertThrows(() => chunked([], NaN), RangeError);
  assertThrows(() => chunked([], Infinity), RangeError);
  assertThrows(() => chunked([], -Infinity), RangeError);
  assertThrows(() => chunked([], -1), RangeError);
  assertThrows(() => chunked([], 1.1), RangeError);
  assertThrows(() => chunked([], 0), RangeError);
});

await test("chunked with iterable the length is divisible by the size", async () => {
  const result = chunked([1, 2, 3, 4, 5, 6], 2);
  const expected = [[1, 2], [3, 4], [5, 6]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});

await test("chunked with iterable the length is not divisible by the size", async () => {
  const result = chunked([1, 2, 3, 4, 5], 2);
  const expected = [[1, 2], [3, 4], [5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});

await test("chunked with iterable the length is equal to the size", async () => {
  const result = chunked([1, 2, 3, 4, 5], 5);
  const expected = [[1, 2, 3, 4, 5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});

await test("chunked with iterable the length is less than the size", async () => {
  const result = chunked([1, 2, 3, 4, 5], 6);
  const expected = [[1, 2, 3, 4, 5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});

await test("chunked with iterable throws RangeError", () => {
  assertThrows(() => chunked([], NaN), RangeError);
  assertThrows(() => chunked([], Infinity), RangeError);
  assertThrows(() => chunked([], -Infinity), RangeError);
  assertThrows(() => chunked([], -1), RangeError);
  assertThrows(() => chunked([], 1.1), RangeError);
  assertThrows(() => chunked([], 0), RangeError);
});
