import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { toArray } from "./to_array.ts";
import { compact } from "./compact.ts";

Deno.test("compact", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("without undefined/null", async () => {
      const result = compact(toAsyncIterable([1, 2, 3, 4, 5]));
      const expected = [1, 2, 3, 4, 5];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with undefined", async () => {
      const result = compact(toAsyncIterable([
        undefined,
        1,
        2,
        undefined,
        3,
        undefined,
        4,
        5,
        undefined,
      ]));
      const expected = [1, 2, 3, 4, 5];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with null", async () => {
      const result = compact(
        toAsyncIterable([null, 1, 2, null, 3, null, 4, 5, null]),
      );
      const expected = [1, 2, 3, 4, 5];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with undefined/null", async () => {
      const result = compact(
        toAsyncIterable([undefined, 1, 2, null, 3, undefined, 4, 5, null]),
      );
      const expected = [1, 2, 3, 4, 5];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("without undefined/null", async () => {
      const result = compact([1, 2, 3, 4, 5]);
      const expected = [1, 2, 3, 4, 5];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with undefined", async () => {
      const result = compact([
        undefined,
        1,
        2,
        undefined,
        3,
        undefined,
        4,
        5,
        undefined,
      ]);
      const expected = [1, 2, 3, 4, 5];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with null", async () => {
      const result = compact([null, 1, 2, null, 3, null, 4, 5, null]);
      const expected = [1, 2, 3, 4, 5];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with undefined/null", async () => {
      const result = compact([undefined, 1, 2, null, 3, undefined, 4, 5, null]);
      const expected = [1, 2, 3, 4, 5];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });
});
