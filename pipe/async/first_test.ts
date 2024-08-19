import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { first } from "./first.ts";

await test("first usage", async () => {
  const result = await pipe([1, 2, 3], first);
  const expected = 1;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});
