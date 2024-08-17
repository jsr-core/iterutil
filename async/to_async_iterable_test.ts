import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";

test("toAsyncIterable", async () => {
  const result = toAsyncIterable([1, 2, 3, 4, 5]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
