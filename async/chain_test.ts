import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { chain } from "./chain.ts";

Deno.test("chain", async (t) => {
  await t.step("with empty iterables", async () => {
    const result = chain([] as number[], [] as string[]);
    const expected = [] as (number | string)[];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<number | string>>>(true);
  });

  await t.step("with iterables", async () => {
    const result = chain(
      [1, 2, 3],
      toAsyncIterable(["a", "b"]),
    );
    const expected = [1, 2, 3, "a", "b"];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<number | string>>>(true);
  });

  await t.step("with multiple iterables", async () => {
    const result = chain(
      toAsyncIterable([1, 2, 3]),
      ["a", "b"],
      toAsyncIterable([true]),
    );
    const expected = [1, 2, 3, "a", "b", true];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<
      IsExact<typeof result, AsyncIterable<number | string | boolean>>
    >(
      true,
    );
  });
});
