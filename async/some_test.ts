import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { some } from "./some.ts";

Deno.test("some", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("true", async () => {
      const result = await some(toAsyncIterable([1, 2, 3, 4, 5]), (v) => v > 4);
      const expected = true;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("false", async () => {
      const result = await some(toAsyncIterable([1, 2, 3, 4, 5]), (v) => v > 5);
      const expected = false;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("true", async () => {
      const result = await some([1, 2, 3, 4, 5], (v) => v > 4);
      const expected = true;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("false", async () => {
      const result = await some([1, 2, 3, 4, 5], (v) => v > 5);
      const expected = false;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, boolean>>(true);
    });
  });
});
