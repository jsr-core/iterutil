import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { take } from "./take.ts";
import { count } from "./count.ts";

Deno.test("count", async (t) => {
  await t.step("default", () => {
    const result = count();
    const expected = [0, 1, 2];
    assertEquals(Array.from(take(result, 3)), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with positive start", () => {
    const result = count(1);
    const expected = [1, 2, 3];
    assertEquals(Array.from(take(result, 3)), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with negative start", () => {
    const result = count(-1);
    const expected = [-1, 0, 1];
    assertEquals(Array.from(take(result, 3)), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with float start", () => {
    const result = count(1.1);
    const expected = [1.1, 2.1, 3.1];
    assertEquals(Array.from(take(result, 3)), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with start and positive step", () => {
    const result = count(1, 2);
    const expected = [1, 3, 5];
    assertEquals(Array.from(take(result, 3)), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with start and negative step", () => {
    const result = count(1, -1);
    const expected = [1, 0, -1];
    assertEquals(Array.from(take(result, 3)), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with start and float step", () => {
    const result = count(1, 0.2);
    const expected = [1.0, 1.2, 1.4];
    assertEquals(Array.from(take(result, 3)), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("throws RangeError", async (t) => {
    await t.step("if the start is not finite", () => {
      assertThrows(() => count(NaN), RangeError);
      assertThrows(() => count(Infinity), RangeError);
      assertThrows(() => count(-Infinity), RangeError);
    });

    await t.step("if the step is not finite", () => {
      assertThrows(() => count(0, NaN), RangeError);
      assertThrows(() => count(0, Infinity), RangeError);
      assertThrows(() => count(0, -Infinity), RangeError);
    });

    await t.step("if the step is 0", () => {
      assertThrows(() => count(0, 0), RangeError);
    });
  });
});
