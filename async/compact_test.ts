import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { compact } from "./compact.ts";

await test("compact with async iterable without undefined/null", async () => {
  const result = compact(toAsyncIterable([1, 2, 3, 4, 5]));
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compact with async iterable with undefined", async () => {
  const result = compact(toAsyncIterable([
    undefined,
    1,
    2,
    undefined,
    3,
    undefined,
    4,
    5,
    undefined,
  ]));
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compact with async iterable with null", async () => {
  const result = compact(
    toAsyncIterable([null, 1, 2, null, 3, null, 4, 5, null]),
  );
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compact with async iterable with undefined/null", async () => {
  const result = compact(
    toAsyncIterable([undefined, 1, 2, null, 3, undefined, 4, 5, null]),
  );
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compact with iterable without undefined/null", async () => {
  const result = compact([1, 2, 3, 4, 5]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compact with iterable with undefined", async () => {
  const result = compact([
    undefined,
    1,
    2,
    undefined,
    3,
    undefined,
    4,
    5,
    undefined,
  ]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compact with iterable with null", async () => {
  const result = compact([null, 1, 2, null, 3, null, 4, 5, null]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compact with iterable with undefined/null", async () => {
  const result = compact([undefined, 1, 2, null, 3, undefined, 4, 5, null]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
