import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { some } from "./some.ts";

Deno.test("some", async (t) => {
  await t.step("true", () => {
    const result = some([1, 2, 3, 4, 5], (v) => v > 4);
    const expected = true;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, boolean>>(true);
  });

  await t.step("false", () => {
    const result = some([1, 2, 3, 4, 5], (v) => v > 5);
    const expected = false;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, boolean>>(true);
  });
});
