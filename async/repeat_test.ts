import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { repeat } from "./repeat.ts";

Deno.test("repeat", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = repeat(toAsyncIterable([0, 1, 2]), 2);
      const expected = [0, 1, 2, 0, 1, 2];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with single value iterable", async () => {
      const result = repeat(toAsyncIterable([0]), 2);
      const expected = [0, 0];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = repeat(toAsyncIterable([] as number[]), 2);
      const expected: number[] = [];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = repeat([0, 1, 2], 2);
      const expected = [0, 1, 2, 0, 1, 2];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with single value iterable", async () => {
      const result = repeat([0], 2);
      const expected = [0, 0];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = repeat([] as number[], 2);
      const expected: number[] = [];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });

  await t.step("with n=0", async () => {
    const result = repeat([0, 1, 2], 0);
    const expected: number[] = [];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });

  await t.step("throws RangeError", async (t) => {
    await t.step("if the limit is not 0 nor positive safe integer", () => {
      assertThrows(() => repeat([], NaN), RangeError);
      assertThrows(() => repeat([], Infinity), RangeError);
      assertThrows(() => repeat([], -Infinity), RangeError);
      assertThrows(() => repeat([], -1), RangeError);
      assertThrows(() => repeat([], 1.1), RangeError);
    });
  });
});
