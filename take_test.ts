import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { take, TakeLimitError } from "./take.ts";

Deno.test("take", async (t) => {
  await t.step("with positive limit", () => {
    const result = take([0, 1, 2, 3, 4], 2);
    const expected = [0, 1];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with negative limit", () => {
    assertThrows(
      () => {
        take([0, 1, 2, 3, 4], -2);
      },
      TakeLimitError,
    );
  });

  await t.step("with 0 limit", () => {
    const result = take([0, 1, 2, 3, 4], 0);
    const expected: number[] = [];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
