import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { take } from "./take.ts";
import { cycle } from "./cycle.ts";

await test("cycle with async iterable with non empty iterable", async () => {
  const result = cycle(toAsyncIterable([0, 1, 2]));
  const expected = [0, 1, 2, 0, 1];
  assertEquals(await Array.fromAsync(take(result, 5)), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("cycle with async iterable with single value iterable", async () => {
  const result = cycle(toAsyncIterable([0]));
  const expected = [0, 0, 0, 0, 0];
  assertEquals(await Array.fromAsync(take(result, 5)), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("cycle with async iterable with empty iterable", async () => {
  const result = cycle(toAsyncIterable([] as number[]));
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(take(result, 5)), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("cycle with iterable with non empty iterable", async () => {
  const result = cycle([0, 1, 2]);
  const expected = [0, 1, 2, 0, 1];
  assertEquals(await Array.fromAsync(take(result, 5)), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("cycle with iterable with single value iterable", async () => {
  const result = cycle([0]);
  const expected = [0, 0, 0, 0, 0];
  assertEquals(await Array.fromAsync(take(result, 5)), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("cycle with iterable with empty iterable", async () => {
  const result = cycle([] as number[]);
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(take(result, 5)), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
