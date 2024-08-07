import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { uniq } from "./uniq.ts";

Deno.test("uniq", async (t) => {
  await t.step("default", () => {
    const result = uniq([1, 2, 3, 1, 2, 3, 10, 20, 30, 11, 21, 31]);
    const expected = [1, 2, 3, 10, 20, 30, 11, 21, 31];
    assertEquals([...result], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with identify", () => {
    const result = uniq(
      [1, 2, 3, 1, 2, 3, 10, 20, 30, 11, 21, 31],
      (v) => Math.floor(v / 10),
    );
    const expected = [1, 10, 20, 30];
    assertEquals([...result], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
