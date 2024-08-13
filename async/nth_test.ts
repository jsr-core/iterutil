import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { nth } from "./nth.ts";

Deno.test("last", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = await nth(toAsyncIterable([1, 2, 3, 4, 5]), 2);
      const expected = 3;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = await nth(toAsyncIterable([] as number[]), 2);
      const expected = undefined;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = await nth([1, 2, 3, 4, 5], 2);
      const expected = 3;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = await nth([] as number[], 2);
      const expected = undefined;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });
  });

  await t.step("throws RangeError", async (t) => {
    await t.step("if the index is not 0 nor positive safe integer", () => {
      assertThrows(() => nth([], NaN), RangeError);
      assertThrows(() => nth([], Infinity), RangeError);
      assertThrows(() => nth([], -Infinity), RangeError);
      assertThrows(() => nth([], -1), RangeError);
      assertThrows(() => nth([], 1.1), RangeError);
    });
  });
});
