import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { range } from "./range.ts";

Deno.test("range", async (t) => {
  await t.step("without step", async (t) => {
    await t.step("with 0 to 0", () => {
      const result = range(0, 0);
      assertEquals(Array.from(result), [0]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with 0 to 2", () => {
      const result = range(0, 2);
      assertEquals(Array.from(result), [0, 1, 2]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with 0 to -2", () => {
      const result = range(0, -2);
      assertEquals(Array.from(result), [0, -1, -2]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with 2 to 0", () => {
      const result = range(2, 0);
      assertEquals(Array.from(result), [2, 1, 0]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with -2 to 0", () => {
      const result = range(-2, 0);
      assertEquals(Array.from(result), [-2, -1, 0]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with -2 to 2", () => {
      const result = range(-2, 2);
      assertEquals(Array.from(result), [-2, -1, 0, 1, 2]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with 2 to -2", () => {
      const result = range(2, -2);
      assertEquals(Array.from(result), [2, 1, 0, -1, -2]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("throws RangeError", async (t) => {
      await t.step("if the start is not finite", () => {
        assertThrows(() => range(NaN, 0), RangeError);
        assertThrows(() => range(Infinity, 0), RangeError);
        assertThrows(() => range(-Infinity, 0), RangeError);
      });

      await t.step("if the end is not finite", () => {
        assertThrows(() => range(0, NaN), RangeError);
        assertThrows(() => range(0, Infinity), RangeError);
        assertThrows(() => range(0, -Infinity), RangeError);
      });
    });
  });

  await t.step("with step", async (t) => {
    await t.step("with 0 to 0", () => {
      const result = range(0, 0, 2);
      assertEquals(Array.from(result), [0]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with 0 to 2", () => {
      const result = range(0, 2, 2);
      assertEquals(Array.from(result), [0, 2]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with 0 to -2", () => {
      const result = range(0, -2, -2);
      assertEquals(Array.from(result), [0, -2]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with 2 to 0", () => {
      const result = range(2, 0, -2);
      assertEquals(Array.from(result), [2, 0]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with -2 to 0", () => {
      const result = range(-2, 0, 2);
      assertEquals(Array.from(result), [-2, 0]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("with -2 to 2", () => {
      const result = range(-2, 2, 2);
      assertEquals(Array.from(result), [-2, 0, 2]);
      assertType<IsExact<typeof result, Iterable<number>>>(true);
    });

    await t.step("throws RangeError", async (t) => {
      await t.step("if the start is not finite", () => {
        assertThrows(() => range(NaN, 0, 2), RangeError);
        assertThrows(() => range(Infinity, 0, 2), RangeError);
        assertThrows(() => range(-Infinity, 0, 2), RangeError);
      });

      await t.step("if the end is not finite", () => {
        assertThrows(() => range(0, NaN, 2), RangeError);
        assertThrows(() => range(0, Infinity, 2), RangeError);
        assertThrows(() => range(0, -Infinity, 2), RangeError);
      });

      await t.step("if the step is not finite", () => {
        assertThrows(() => range(0, 0, NaN), RangeError);
        assertThrows(() => range(0, 0, Infinity), RangeError);
        assertThrows(() => range(0, 0, -Infinity), RangeError);
      });

      await t.step("if the step is 0", () => {
        assertThrows(() => range(0, 0, 0), RangeError);
      });

      await t.step(
        "if the start is greater than stop for positive step",
        () => {
          assertThrows(() => range(1, 0, 1), RangeError);
        },
      );

      await t.step(
        "if the start is less than stop for negative step",
        () => {
          assertThrows(() => range(0, 1, -1), RangeError);
        },
      );
    });
  });
});
