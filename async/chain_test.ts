import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { toArray } from "./to_array.ts";
import { chain } from "./chain.ts";

Deno.test("chain", async (t) => {
  await t.step("with async iterable", async () => {
    const result = chain(
      toAsyncIterable([1, 2]),
      toAsyncIterable([3, 4]),
      toAsyncIterable([5]),
    );
    const expected = [1, 2, 3, 4, 5];
    assertEquals(await toArray(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });

  await t.step("with iterable", async () => {
    const result = chain([1, 2], [3, 4], [5]);
    const expected = [1, 2, 3, 4, 5];
    assertEquals(await toArray(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });

  await t.step("with mixed iterable", async () => {
    const result = chain(
      toAsyncIterable([1, 2]),
      [3, 4],
      toAsyncIterable([5]),
    );
    const expected = [1, 2, 3, 4, 5];
    assertEquals(await toArray(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });
});
