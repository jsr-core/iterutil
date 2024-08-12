import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { chunked } from "./chunked.ts";

Deno.test("chunked", async (t) => {
  await t.step("usage", () => {
    const result = pipe([1, 2, 3, 4, 5, 6], chunked(2));
    const expected = [[1, 2], [3, 4], [5, 6]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number[]>>>(true);
  });
});
