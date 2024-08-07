import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { first } from "./first.ts";

Deno.test("first", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = await first(toAsyncIterable([1, 2, 3, 4, 5]));
      const expected = 1;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = await first(toAsyncIterable([] as number[]));
      const expected = undefined;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = await first([1, 2, 3, 4, 5]);
      const expected = 1;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = await first([] as number[]);
      const expected = undefined;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });
  });
});
