import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { every } from "./every.ts";

Deno.test("every", async (t) => {
  await t.step("true", () => {
    const result = every([1, 2, 3, 4, 5], (v) => v > 0);
    const expected = true;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, boolean>>(true);
  });

  await t.step("false", () => {
    const result = every([1, 2, 3, 4, 5], (v) => v > 1);
    const expected = false;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, boolean>>(true);
  });
});
