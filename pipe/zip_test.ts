import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { zip } from "./zip.ts";

Deno.test("zip", async (t) => {
  await t.step("usage", () => {
    const result = pipe([1, 2, 3], zip(["a", "b", "c"], [true, false, true]));
    const expected = [[1, "a", true], [2, "b", false], [3, "c", true]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, string, boolean]>>>(
      true,
    );
  });
});
