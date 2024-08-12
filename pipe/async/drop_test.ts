import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { drop } from "./drop.ts";

Deno.test("drop", async (t) => {
  await t.step("usage", async () => {
    const result = pipe([0, 1, 2, 3, 4], drop(2));
    const expected = [2, 3, 4];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });
});
