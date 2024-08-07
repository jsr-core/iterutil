import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { last } from "./last.ts";

Deno.test("last", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = await last(toAsyncIterable([1, 2, 3, 4, 5]));
      const expected = 5;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = await last(toAsyncIterable([] as number[]));
      const expected = undefined;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = await last([1, 2, 3, 4, 5]);
      const expected = 5;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = await last([] as number[]);
      const expected = undefined;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });
  });
});
