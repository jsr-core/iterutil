import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { pairwise } from "./pairwise.ts";

await test("pairwise with async iterable with non empty iterable", async () => {
  const result = pairwise(toAsyncIterable([1, 2, 3, 4, 5]));
  const expected = [[1, 2], [2, 3], [3, 4], [4, 5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("pairwise with async iterable with single value iterable", async () => {
  const result = pairwise(toAsyncIterable([1]));
  const expected: number[][] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("pairwise with async iterable with empty iterable", async () => {
  const result = pairwise(toAsyncIterable([] as number[]));
  const expected: number[][] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("pairwise with iterable with non empty iterable", async () => {
  const result = pairwise([1, 2, 3, 4, 5]);
  const expected = [[1, 2], [2, 3], [3, 4], [4, 5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("pairwise with iterable with single value iterable", async () => {
  const result = pairwise([1]);
  const expected: number[][] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("pairwise with iterable with empty iterable", async () => {
  const result = pairwise([] as number[]);
  const expected: number[][] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});
