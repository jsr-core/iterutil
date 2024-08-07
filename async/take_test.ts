import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { toArray } from "./to_array.ts";
import { take } from "./take.ts";

Deno.test("take", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("with positive limit", async () => {
      const result = take(toAsyncIterable([0, 1, 2, 3, 4]), 2);
      const expected = [0, 1];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with negative limit", () => {
      assertThrows(
        () => {
          take([0, 1, 2, 3, 4], -2);
        },
        Error,
        "limit argument must be greater than or equal to 0, but got -2.",
      );
    });

    await t.step("with 0 limit", async () => {
      const result = take(toAsyncIterable([0, 1, 2, 3, 4]), 0);
      const expected: number[] = [];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("with positive limit", async () => {
      const result = take([0, 1, 2, 3, 4], 2);
      const expected = [0, 1];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with negative limit", () => {
      assertThrows(
        () => {
          take([0, 1, 2, 3, 4], -2);
        },
        Error,
        "limit argument must be greater than or equal to 0, but got -2.",
      );
    });

    await t.step("with 0 limit", async () => {
      const result = take([0, 1, 2, 3, 4], 0);
      const expected: number[] = [];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });
});
