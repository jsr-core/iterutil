import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { last } from "./last.ts";

await test("last with async iterable with non empty iterable", async () => {
  const result = await last(toAsyncIterable([1, 2, 3, 4, 5]));
  const expected = 5;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("last with async iterable with empty iterable", async () => {
  const result = await last(toAsyncIterable([] as number[]));
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("last with iterable with non empty iterable", async () => {
  const result = await last([1, 2, 3, 4, 5]);
  const expected = 5;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("last with iterable with empty iterable", async () => {
  const result = await last([] as number[]);
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});
