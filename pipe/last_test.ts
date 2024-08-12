import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { last } from "./last.ts";

Deno.test("last", async (t) => {
  await t.step("usage", () => {
    const result = pipe([1, 2, 3], last);
    const expected = 3;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });
});
