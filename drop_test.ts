import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { drop, DropLimitError } from "./drop.ts";

Deno.test("drop", async (t) => {
  await t.step("with positive limit", () => {
    const result = drop([0, 1, 2, 3, 4], 2);
    const expected = [2, 3, 4];
    assertEquals([...result], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with negative limit", () => {
    assertThrows(
      () => {
        drop([0, 1, 2, 3, 4], -2);
      },
      DropLimitError,
    );
  });

  await t.step("with 0 limit", () => {
    const result = drop([0, 1, 2, 3, 4], 0);
    const expected = [0, 1, 2, 3, 4];
    assertEquals([...result], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
