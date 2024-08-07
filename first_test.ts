import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { first } from "./first.ts";

Deno.test("first", async (t) => {
  await t.step("with non empty iterable", () => {
    const result = first([1, 2, 3, 4, 5]);
    const expected = 1;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });

  await t.step("with empty iterable", () => {
    const result = first([] as number[]);
    const expected = undefined;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });
});
