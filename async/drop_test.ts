import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { toArray } from "./to_array.ts";
import { drop, DropLimitError } from "./drop.ts";

Deno.test("drop", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("with positive limit", async () => {
      const result = drop(toAsyncIterable([0, 1, 2, 3, 4]), 2);
      const expected = [2, 3, 4];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with negative limit", () => {
      assertThrows(
        () => {
          drop([0, 1, 2, 3, 4], -2);
        },
        DropLimitError,
      );
    });

    await t.step("with 0 limit", async () => {
      const result = drop(toAsyncIterable([0, 1, 2, 3, 4]), 0);
      const expected = [0, 1, 2, 3, 4];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("with positive limit", async () => {
      const result = drop([0, 1, 2, 3, 4], 2);
      const expected = [2, 3, 4];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with negative limit", () => {
      assertThrows(
        () => {
          drop([0, 1, 2, 3, 4], -2);
        },
        DropLimitError,
      );
    });

    await t.step("with 0 limit", async () => {
      const result = drop([0, 1, 2, 3, 4], 0);
      const expected = [0, 1, 2, 3, 4];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });
});
