import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { flatten } from "./flatten.ts";

await test("flatten with iterable single nest", async () => {
  const result = flatten([[1, 2], [3, 4], [5]]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("flatten with iterable single async iterable nest", async () => {
  const result = flatten([
    toAsyncIterable([1, 2]),
    toAsyncIterable([3, 4]),
    toAsyncIterable([5]),
  ]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("flatten with iterable single promise nest", async () => {
  const result = flatten<number>([
    Promise.resolve([1, 2]),
    Promise.resolve([3, 4]),
    Promise.resolve([5]),
  ]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("flatten with iterable multi nest", async () => {
  const result = flatten([[[1, 2], [3, 4]], [[5]]]);
  const expected = [[1, 2], [3, 4], [5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});
