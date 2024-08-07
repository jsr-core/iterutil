import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { toArray } from "./to_array.ts";
import { pairwise } from "./pairwise.ts";

Deno.test("pairwise", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = pairwise(toAsyncIterable([1, 2, 3, 4, 5]));
      const expected = [[1, 2], [2, 3], [3, 4], [4, 5]];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });

    await t.step("with single value iterable", async () => {
      const result = pairwise(toAsyncIterable([1]));
      const expected: number[][] = [];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = pairwise(toAsyncIterable([] as number[]));
      const expected: number[][] = [];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = pairwise([1, 2, 3, 4, 5]);
      const expected = [[1, 2], [2, 3], [3, 4], [4, 5]];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });

    await t.step("with single value iterable", async () => {
      const result = pairwise([1]);
      const expected: number[][] = [];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = pairwise([] as number[]);
      const expected: number[][] = [];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
    });
  });
});
