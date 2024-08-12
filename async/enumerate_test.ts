import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { enumerate } from "./enumerate.ts";

Deno.test("enumerate", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("default", async () => {
      const result = enumerate(toAsyncIterable([0, 1, 2]));
      const expected = [[0, 0], [1, 1], [2, 2]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });

    await t.step("with start", async () => {
      const result = enumerate(toAsyncIterable([0, 1, 2]), 1);
      const expected = [[1, 0], [2, 1], [3, 2]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });

    await t.step("with start/step", async () => {
      const result = enumerate(toAsyncIterable([0, 1, 2]), 1, 2);
      const expected = [[1, 0], [3, 1], [5, 2]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("default", async () => {
      const result = enumerate([0, 1, 2]);
      const expected = [[0, 0], [1, 1], [2, 2]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });

    await t.step("with start", async () => {
      const result = enumerate([0, 1, 2], 1);
      const expected = [[1, 0], [2, 1], [3, 2]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });

    await t.step("with start/step", async () => {
      const result = enumerate([0, 1, 2], 1, 2);
      const expected = [[1, 0], [3, 1], [5, 2]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });
  });
});
