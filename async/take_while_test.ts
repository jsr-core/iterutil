import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { takeWhile } from "./take_while.ts";

await test("takeWhile with async iterable with some true", async () => {
  const result = takeWhile(toAsyncIterable([0, 1, 2, 3, 4]), (v) => v < 2);
  const expected = [0, 1];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("takeWhile with async iterable with some promise true", async () => {
  const result = takeWhile(
    toAsyncIterable([0, 1, 2, 3, 4]),
    (v) => Promise.resolve(v < 2),
  );
  const expected = [0, 1];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("takeWhile with async iterable with all true", async () => {
  const result = takeWhile(toAsyncIterable([0, 1, 2, 3, 4]), () => true);
  const expected = [0, 1, 2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("takeWhile with async iterable with all false", async () => {
  const result = takeWhile(toAsyncIterable([0, 1, 2, 3, 4]), () => false);
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("takeWhile with iterable with some true", async () => {
  const result = takeWhile([0, 1, 2, 3, 4], (v) => v < 2);
  const expected = [0, 1];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("takeWhile with iterable with some promise true", async () => {
  const result = takeWhile([0, 1, 2, 3, 4], (v) => Promise.resolve(v < 2));
  const expected = [0, 1];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("takeWhile with iterable with all true", async () => {
  const result = takeWhile([0, 1, 2, 3, 4], () => true);
  const expected = [0, 1, 2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("takeWhile with iterable with all false", async () => {
  const result = takeWhile([0, 1, 2, 3, 4], () => false);
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
