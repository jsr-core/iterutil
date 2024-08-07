import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toArray } from "./to_array.ts";
import { toAsyncIterable } from "./to_async_iterable.ts";

Deno.test("toAsyncIterable", async () => {
  const result = toAsyncIterable([1, 2, 3, 4, 5]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await toArray(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
