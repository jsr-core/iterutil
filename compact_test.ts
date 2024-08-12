import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { compact } from "./compact.ts";

Deno.test("compact", async (t) => {
  await t.step("without undefined/null", () => {
    const result = compact([1, 2, 3, 4, 5]);
    const expected = [1, 2, 3, 4, 5];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with undefined", () => {
    const result = compact([
      undefined,
      1,
      2,
      undefined,
      3,
      undefined,
      4,
      5,
      undefined,
    ]);
    const expected = [1, 2, 3, 4, 5];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with null", () => {
    const result = compact([null, 1, 2, null, 3, null, 4, 5, null]);
    const expected = [1, 2, 3, 4, 5];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with undefined/null", () => {
    const result = compact([undefined, 1, 2, null, 3, undefined, 4, 5, null]);
    const expected = [1, 2, 3, 4, 5];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
