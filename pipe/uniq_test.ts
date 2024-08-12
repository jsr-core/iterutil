import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { uniq } from "./uniq.ts";

Deno.test("uniq", async (t) => {
  await t.step("usage 1", () => {
    const result = pipe([1, 2, 2, 3, 3, 3], uniq());
    const expected = [1, 2, 3];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with identify", () => {
    const result = pipe(
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      uniq((v) => v % 4),
    );
    const expected = [1, 2, 3, 4];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
