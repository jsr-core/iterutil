import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { flatten } from "./flatten.ts";

Deno.test("flatten", async (t) => {
  await t.step("single nest", () => {
    const result = flatten([[1, 2], [3, 4], [5]]);
    const expected = [1, 2, 3, 4, 5];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("multi nest", () => {
    const result = flatten([[[1, 2], [3, 4]], [[5]]]);
    const expected = [[1, 2], [3, 4], [5]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number[]>>>(true);
  });
});
