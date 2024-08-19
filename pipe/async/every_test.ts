import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { every } from "./every.ts";

await test("every usage", async () => {
  const result = await pipe([1, 2, 3], every((v) => v > 0));
  const expected = true;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, boolean>>(true);
});
