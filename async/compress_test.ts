import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { compress } from "./compress.ts";

await test("compress with async iterable the iterable and the selectors are same length", async () => {
  const result = compress(
    toAsyncIterable([1, 2, 3, 4, 5]),
    toAsyncIterable([true, false, true, false, true]),
  );
  const expected = [1, 3, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compress with async iterable the iterable is larger than the selectors", async () => {
  const result = compress(
    toAsyncIterable([1, 2, 3, 4, 5]),
    toAsyncIterable([true, false, true]),
  );
  const expected = [1, 3];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compress with async iterable the iterable is smaller than the selector", async () => {
  const result = compress(
    toAsyncIterable([1, 2, 3]),
    toAsyncIterable([true, false, true, false, true]),
  );
  const expected = [1, 3];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compress with iterable the iterable and the selectors are same length", async () => {
  const result = compress([1, 2, 3, 4, 5], [
    true,
    false,
    true,
    false,
    true,
  ]);
  const expected = [1, 3, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compress with iterable the iterable is larger than the selectors", async () => {
  const result = compress([1, 2, 3, 4, 5], [true, false, true]);
  const expected = [1, 3];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("compress with iterable the iterable is smaller than the selector", async () => {
  const result = compress([1, 2, 3], [true, false, true, false, true]);
  const expected = [1, 3];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
