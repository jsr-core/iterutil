import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { chunked } from "./chunked.ts";

Deno.test("chunked", async (t) => {
  await t.step("the length is divisible by the size", () => {
    const result = chunked([1, 2, 3, 4, 5, 6], 2);
    const expected = [[1, 2], [3, 4], [5, 6]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number[]>>>(true);
  });

  await t.step("the length is not divisible by the size", () => {
    const result = chunked([1, 2, 3, 4, 5], 2);
    const expected = [[1, 2], [3, 4], [5]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number[]>>>(true);
  });

  await t.step("the length is equal to the size", () => {
    const result = chunked([1, 2, 3, 4, 5], 5);
    const expected = [[1, 2, 3, 4, 5]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number[]>>>(true);
  });

  await t.step("the length is less than the size", () => {
    const result = chunked([1, 2, 3, 4, 5], 6);
    const expected = [[1, 2, 3, 4, 5]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number[]>>>(true);
  });
});
