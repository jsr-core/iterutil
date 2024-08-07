import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { every } from "./every.ts";

Deno.test("every", async (t) => {
  await t.step("with iterable", async (t) => {
    await t.step("true", async () => {
      const result = await every(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (v) => v > 0,
      );
      const expected = true;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("false", async () => {
      const result = await every(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (v) => v > 1,
      );
      const expected = false;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("promise true", async () => {
      const result = await every(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (v) => Promise.resolve(v > 0),
      );
      const expected = true;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("promise false", async () => {
      const result = await every(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (v) => Promise.resolve(v > 1),
      );
      const expected = false;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("true", async () => {
      const result = await every([1, 2, 3, 4, 5], (v) => v > 0);
      const expected = true;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("false", async () => {
      const result = await every([1, 2, 3, 4, 5], (v) => v > 1);
      const expected = false;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("promise true", async () => {
      const result = await every(
        [1, 2, 3, 4, 5],
        (v) => Promise.resolve(v > 0),
      );
      const expected = true;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("promise false", async () => {
      const result = await every(
        [1, 2, 3, 4, 5],
        (v) => Promise.resolve(v > 1),
      );
      const expected = false;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });
  });
});
