import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { uniq } from "./uniq.ts";

Deno.test("uniq", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("default", async () => {
      const result = uniq(
        toAsyncIterable([1, 2, 3, 1, 2, 3, 10, 20, 30, 11, 21, 31]),
      );
      const expected = [1, 2, 3, 10, 20, 30, 11, 21, 31];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with identify", async () => {
      const result = uniq(
        toAsyncIterable([1, 2, 3, 1, 2, 3, 10, 20, 30, 11, 21, 31]),
        (v) => Math.floor(v / 10),
      );
      const expected = [1, 10, 20, 30];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with identify promise", async () => {
      const result = uniq(
        toAsyncIterable([1, 2, 3, 1, 2, 3, 10, 20, 30, 11, 21, 31]),
        (v) => Promise.resolve(Math.floor(v / 10)),
      );
      const expected = [1, 10, 20, 30];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("default", async () => {
      const result = uniq([1, 2, 3, 1, 2, 3, 10, 20, 30, 11, 21, 31]);
      const expected = [1, 2, 3, 10, 20, 30, 11, 21, 31];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with identify", async () => {
      const result = uniq(
        [1, 2, 3, 1, 2, 3, 10, 20, 30, 11, 21, 31],
        (v) => Math.floor(v / 10),
      );
      const expected = [1, 10, 20, 30];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with identify promise", async () => {
      const result = uniq(
        [1, 2, 3, 1, 2, 3, 10, 20, 30, 11, 21, 31],
        (v) => Promise.resolve(Math.floor(v / 10)),
      );
      const expected = [1, 10, 20, 30];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });
});
