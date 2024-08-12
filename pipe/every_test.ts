import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { every } from "./every.ts";

Deno.test("every", async (t) => {
  await t.step("usage", () => {
    const result = pipe([1, 2, 3], every((v) => v > 0));
    const expected = true;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, boolean>>(true);
  });
});
