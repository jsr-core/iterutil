import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { dropWhile } from "./drop_while.ts";

Deno.test("dropWhile", async (t) => {
  await t.step("with some true", () => {
    const values: number[] = [];
    const indices: number[] = [];
    const result = dropWhile([1, 2, 3, 4, 5], (v, index) => {
      values.push(v);
      indices.push(index);
      return v < 3;
    });
    const expected = [3, 4, 5];
    assertEquals(Array.from(result), expected);
    assertEquals(values, [1, 2, 3]);
    assertEquals(indices, [0, 1, 2]);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with all true", () => {
    const result = dropWhile([1, 2, 3, 4, 5], () => true);
    const expected: number[] = [];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with all false", () => {
    const result = dropWhile([1, 2, 3, 4, 5], () => false);
    const expected = [1, 2, 3, 4, 5];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
