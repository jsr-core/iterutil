import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { zip } from "./zip.ts";

await test("zip usage", async () => {
  const result = pipe([1, 2, 3], zip(["a", "b", "c"], [true, false, true]));
  const expected = [[1, "a", true], [2, "b", false], [3, "c", true]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<
    IsExact<typeof result, AsyncIterable<[number, string, boolean]>>
  >(
    true,
  );
});
