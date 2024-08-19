import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { takeWhile } from "./take_while.ts";

await test("takeWhile usage", async () => {
  const result = pipe([1, 2, 3, 4, 5], takeWhile((v) => v < 4));
  const expected = [1, 2, 3];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
