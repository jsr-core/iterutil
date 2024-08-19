import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { nth } from "./nth.ts";

await test("last with async iterable with non empty iterable", async () => {
  const result = await nth(toAsyncIterable([1, 2, 3, 4, 5]), 2);
  const expected = 3;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("last with async iterable with empty iterable", async () => {
  const result = await nth(toAsyncIterable([] as number[]), 2);
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("last with iterable with non empty iterable", async () => {
  const result = await nth([1, 2, 3, 4, 5], 2);
  const expected = 3;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("last with iterable with empty iterable", async () => {
  const result = await nth([] as number[], 2);
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("last with iterable last throws RangeError", () => {
  assertThrows(() => nth([], NaN), RangeError);
  assertThrows(() => nth([], Infinity), RangeError);
  assertThrows(() => nth([], -Infinity), RangeError);
  assertThrows(() => nth([], -1), RangeError);
  assertThrows(() => nth([], 1.1), RangeError);
});
