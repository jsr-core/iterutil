import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { toArray } from "./to_array.ts";
import { iter } from "./iter.ts";

Deno.test("iter", async (t) => {
  await t.step("with async iterable", async () => {
    const it = iter(toAsyncIterable([0, 1, 2, 3, 4, 5]));
    assertEquals(await it.next(), { done: false, value: 0 });
    assertEquals(await it.next(), { done: false, value: 1 });
    assertEquals(await toArray(it), [2, 3, 4, 5]);
    assertType<IsExact<typeof it, AsyncIterableIterator<number>>>(true);
  });

  await t.step("with iterable", async () => {
    const it = iter([0, 1, 2, 3, 4, 5]);
    assertEquals(await it.next(), { done: false, value: 0 });
    assertEquals(await it.next(), { done: false, value: 1 });
    assertEquals(await toArray(it), [2, 3, 4, 5]);
    assertType<IsExact<typeof it, AsyncIterableIterator<number>>>(true);
  });
});
