import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { nth } from "./nth.ts";

Deno.test("nth", async (t) => {
  await t.step("with non empty iterable", () => {
    const result = nth([1, 2, 3, 4, 5], 2);
    const expected = 3;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });

  await t.step("with empty iterable", () => {
    const result = nth([] as number[], 2);
    const expected = undefined;
    assertEquals(result, expected);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });

  await t.step("throws RangeError", async (t) => {
    await t.step("if the index is not 0 nor positive safe integer", () => {
      assertThrows(() => nth([], NaN), RangeError);
      assertThrows(() => nth([], Infinity), RangeError);
      assertThrows(() => nth([], -Infinity), RangeError);
      assertThrows(() => nth([], -1), RangeError);
      assertThrows(() => nth([], 1.1), RangeError);
    });
  });
});
