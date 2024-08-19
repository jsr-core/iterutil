import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { last } from "./last.ts";

await test("last usage", async () => {
  const result = await pipe([1, 2, 3], last);
  const expected = 3;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});
