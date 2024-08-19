import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { pairwise } from "./pairwise.ts";

await test("pairwise usage", async () => {
  const result = pipe([1, 2, 3, 4, 5], pairwise);
  const expected = [[1, 2], [2, 3], [3, 4], [4, 5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});
