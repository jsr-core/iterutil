import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { take } from "./take.ts";

Deno.test("take", async (t) => {
  await t.step("usage 1", () => {
    const result = pipe([1, 2, 3, 4, 5], take(2));
    const expected = [1, 2];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
