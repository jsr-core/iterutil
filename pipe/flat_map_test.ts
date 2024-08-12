import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { flatMap } from "./flat_map.ts";

Deno.test("flatMap", async (t) => {
  await t.step("usage", () => {
    const result = pipe(
      [1, 2, 3],
      flatMap((v) => [v, v]),
    );
    const expected = [1, 1, 2, 2, 3, 3];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
