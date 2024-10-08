import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { repeat } from "./repeat.ts";

await test("repeat usage", async () => {
  const result = pipe([0, 1, 2], repeat(2));
  const expected = [0, 1, 2, 0, 1, 2];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
