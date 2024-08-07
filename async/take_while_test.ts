import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { toArray } from "./to_array.ts";
import { takeWhile } from "./take_while.ts";

Deno.test("takeWhile", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("with some true", async () => {
      const result = takeWhile(toAsyncIterable([0, 1, 2, 3, 4]), (v) => v < 2);
      const expected = [0, 1];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with some promise true", async () => {
      const result = takeWhile(
        toAsyncIterable([0, 1, 2, 3, 4]),
        (v) => Promise.resolve(v < 2),
      );
      const expected = [0, 1];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with all true", async () => {
      const result = takeWhile(toAsyncIterable([0, 1, 2, 3, 4]), () => true);
      const expected = [0, 1, 2, 3, 4];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with all false", async () => {
      const result = takeWhile(toAsyncIterable([0, 1, 2, 3, 4]), () => false);
      const expected: number[] = [];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("with some true", async () => {
      const result = takeWhile([0, 1, 2, 3, 4], (v) => v < 2);
      const expected = [0, 1];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with some promise true", async () => {
      const result = takeWhile([0, 1, 2, 3, 4], (v) => Promise.resolve(v < 2));
      const expected = [0, 1];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with all true", async () => {
      const result = takeWhile([0, 1, 2, 3, 4], () => true);
      const expected = [0, 1, 2, 3, 4];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with all false", async () => {
      const result = takeWhile([0, 1, 2, 3, 4], () => false);
      const expected: number[] = [];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });
});
