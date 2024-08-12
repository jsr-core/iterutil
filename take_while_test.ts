import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { takeWhile } from "./take_while.ts";

Deno.test("takeWhile", async (t) => {
  await t.step("with some true", () => {
    const result = takeWhile([0, 1, 2, 3, 4], (v) => v < 2);
    const expected = [0, 1];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with all true", () => {
    const result = takeWhile([0, 1, 2, 3, 4], () => true);
    const expected = [0, 1, 2, 3, 4];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with all false", () => {
    const result = takeWhile([0, 1, 2, 3, 4], () => false);
    const expected: number[] = [];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
