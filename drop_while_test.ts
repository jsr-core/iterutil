import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { dropWhile } from "./drop_while.ts";

Deno.test("dropWhile", async (t) => {
  await t.step("with some true", () => {
    const result = dropWhile([0, 1, 2, 3, 4], (v) => v < 2);
    const expected = [2, 3, 4];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with all true", () => {
    const result = dropWhile([0, 1, 2, 3, 4], () => true);
    const expected: number[] = [];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with all false", () => {
    const result = dropWhile([0, 1, 2, 3, 4], () => false);
    const expected = [0, 1, 2, 3, 4];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
