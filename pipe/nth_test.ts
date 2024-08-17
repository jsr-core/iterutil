import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { nth } from "./nth.ts";

await test("nth usage", () => {
  const result = pipe([1, 2, 3], nth(1));
  const expected = 2;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});
