import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { last } from "./last.ts";

Deno.test("last", async (t) => {
  await t.step("with non empty iterable", () => {
    const result = last([1, 2, 3, 4, 5]);
    const expected = 5;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });

  await t.step("with empty iterable", () => {
    const result = last([] as number[]);
    const expected = undefined;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });
});
