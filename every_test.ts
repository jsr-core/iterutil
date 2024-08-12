import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { every } from "./every.ts";

Deno.test("every", async (t) => {
  await t.step("returns true if all elements satisfy the function", () => {
    const values: number[] = [];
    const indices: number[] = [];
    const result = every([1, 2, 3, 4, 5], (v, index) => {
      values.push(v);
      indices.push(index);
      return v < 6;
    });
    const expected = true;
    assertEquals(result, expected);
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
    assertType<IsExact<typeof result, boolean>>(true);
  });

  await t.step(
    "returns false if not all elements satisfy the function",
    () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = every([1, 2, 3, 4, 5], (v, index) => {
        values.push(v);
        indices.push(index);
        return v < 3;
      });
      const expected = false;
      assertEquals(result, expected);
      assertEquals(values, [1, 2, 3]);
      assertEquals(indices, [0, 1, 2]);
      assertType<IsExact<typeof result, boolean>>(true);
    },
  );
});
