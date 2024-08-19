import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { iter } from "./iter.ts";

await test("iter with async iterable", async () => {
  const it = iter(toAsyncIterable([0, 1, 2, 3, 4, 5]));
  assertEquals(await it.next(), { done: false, value: 0 });
  assertEquals(await it.next(), { done: false, value: 1 });
  assertEquals(await Array.fromAsync(it), [2, 3, 4, 5]);
  assertType<IsExact<typeof it, AsyncIterableIterator<number>>>(true);
});

await test("iter with iterable", async () => {
  const it = iter([0, 1, 2, 3, 4, 5]);
  assertEquals(await it.next(), { done: false, value: 0 });
  assertEquals(await it.next(), { done: false, value: 1 });
  assertEquals(await Array.fromAsync(it), [2, 3, 4, 5]);
  assertType<IsExact<typeof it, AsyncIterableIterator<number>>>(true);
});
