import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { enumerate } from "./enumerate.ts";

Deno.test("enumerate", async (t) => {
  await t.step("default", () => {
    const result = enumerate([0, 1, 2]);
    const expected = [[0, 0], [1, 1], [2, 2]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
  });

  await t.step("with positive start", () => {
    const result = enumerate([0, 1, 2], 1);
    const expected = [[1, 0], [2, 1], [3, 2]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
  });

  await t.step("with negative start", () => {
    const result = enumerate([0, 1, 2], -1);
    const expected = [[-1, 0], [0, 1], [1, 2]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
  });

  await t.step("with float start", () => {
    const result = enumerate([0, 1, 2], 1.1);
    const expected = [[1.1, 0], [2.1, 1], [3.1, 2]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
  });

  await t.step("with start and positive step", () => {
    const result = enumerate([0, 1, 2], 1, 2);
    const expected = [[1, 0], [3, 1], [5, 2]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
  });

  await t.step("with start and negative step", () => {
    const result = enumerate([0, 1, 2], 1, -1);
    const expected = [[1, 0], [0, 1], [-1, 2]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
  });

  await t.step("with start and float step", () => {
    const result = enumerate([0, 1, 2], 1, 0.2);
    const expected = [[1, 0], [1.2, 1], [1.4, 2]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
  });

  await t.step("throws RangeError", async (t) => {
    await t.step("if the start is not finite", () => {
      assertThrows(() => enumerate([], NaN), RangeError);
      assertThrows(() => enumerate([], Infinity), RangeError);
      assertThrows(() => enumerate([], -Infinity), RangeError);
    });

    await t.step("if the step is not finite", () => {
      assertThrows(() => enumerate([], 0, NaN), RangeError);
      assertThrows(() => enumerate([], 0, Infinity), RangeError);
      assertThrows(() => enumerate([], 0, -Infinity), RangeError);
    });

    await t.step("if the step is 0", () => {
      assertThrows(() => enumerate([], 0, 0), RangeError);
    });
  });
});
