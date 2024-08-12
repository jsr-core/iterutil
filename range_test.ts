import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { range } from "./range.ts";

Deno.test("range", async (t) => {
  await t.step("default", () => {
    const result = range(5);
    assertEquals(Array.from(result), [0, 1, 2, 3, 4]);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with start/stop", () => {
    const result = range(1, 5);
    assertEquals(Array.from(result), [1, 2, 3, 4]);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with start/stop/step", () => {
    const result = range(1, 10, 2);
    assertEquals(Array.from(result), [1, 3, 5, 7, 9]);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
