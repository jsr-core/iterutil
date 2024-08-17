import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { repeat } from "./repeat.ts";

Deno.test("repeat", async (t) => {
  await t.step("with non empty iterable", () => {
    const result = repeat([0, 1, 2], 2);
    const expected = [0, 1, 2, 0, 1, 2];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with single value iterable", () => {
    const result = repeat([0], 2);
    const expected = [0, 0];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with empty iterable", () => {
    const result = repeat([] as number[], 2);
    const expected: number[] = [];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with n=0", () => {
    const result = repeat([0, 1, 2], 0);
    const expected: number[] = [];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("throws RangeError", async (t) => {
    await t.step("if the limit is not 0 nor positive safe integer", () => {
      assertThrows(() => repeat([], NaN), RangeError);
      assertThrows(() => repeat([], Infinity), RangeError);
      assertThrows(() => repeat([], -Infinity), RangeError);
      assertThrows(() => repeat([], -1), RangeError);
      assertThrows(() => repeat([], 1.1), RangeError);
    });
  });
});
