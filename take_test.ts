import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { iter } from "./iter.ts";
import { take } from "./take.ts";

Deno.test("take", async (t) => {
  await t.step("with positive limit", () => {
    const result = take([0, 1, 2, 3, 4], 2);
    const expected = [0, 1];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with 0 limit", () => {
    const result = take([0, 1, 2, 3, 4], 0);
    const expected: number[] = [];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("will stop consuming once limit items is taken", () => {
    const it = iter([0, 1, 2, 3, 4]);
    const result = take(it, 3);
    const expected: number[] = [0, 1, 2];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
    // Ensure the iterator is NOT fully consumed
    assertEquals(Array.from(it), [3, 4]);
  });

  await t.step("throws RangeError", async (t) => {
    await t.step("if the limit is not 0 nor positive safe integer", () => {
      assertThrows(() => take([], NaN), RangeError);
      assertThrows(() => take([], Infinity), RangeError);
      assertThrows(() => take([], -Infinity), RangeError);
      assertThrows(() => take([], -1), RangeError);
      assertThrows(() => take([], 1.1), RangeError);
    });
  });
});
