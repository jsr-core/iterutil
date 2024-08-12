import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { first } from "./first.ts";

Deno.test("first", async (t) => {
  await t.step("usage", () => {
    const result = pipe([1, 2, 3], first);
    const expected = 1;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });
});
