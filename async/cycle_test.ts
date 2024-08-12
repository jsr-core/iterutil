import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { take } from "./take.ts";
import { cycle } from "./cycle.ts";

Deno.test("cycle", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = cycle(toAsyncIterable([0, 1, 2]));
      const expected = [0, 1, 2, 0, 1];
      assertEquals(await Array.fromAsync(take(result, 5)), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with single value iterable", async () => {
      const result = cycle(toAsyncIterable([0]));
      const expected = [0, 0, 0, 0, 0];
      assertEquals(await Array.fromAsync(take(result, 5)), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = cycle(toAsyncIterable([] as number[]));
      const expected: number[] = [];
      assertEquals(await Array.fromAsync(take(result, 5)), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const result = cycle([0, 1, 2]);
      const expected = [0, 1, 2, 0, 1];
      assertEquals(await Array.fromAsync(take(result, 5)), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with single value iterable", async () => {
      const result = cycle([0]);
      const expected = [0, 0, 0, 0, 0];
      assertEquals(await Array.fromAsync(take(result, 5)), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with empty iterable", async () => {
      const result = cycle([] as number[]);
      const expected: number[] = [];
      assertEquals(await Array.fromAsync(take(result, 5)), expected);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });
});
