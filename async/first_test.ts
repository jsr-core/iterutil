import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { first } from "./first.ts";

await test("first with async iterable with non empty iterable", async () => {
  const result = await first(toAsyncIterable([1, 2, 3, 4, 5]));
  const expected = 1;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("first with async iterable with empty iterable", async () => {
  const result = await first(toAsyncIterable([] as number[]));
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("first with iterable with non empty iterable", async () => {
  const result = await first([1, 2, 3, 4, 5]);
  const expected = 1;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("first with iterable with empty iterable", async () => {
  const result = await first([] as number[]);
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});
