import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { repeat } from "./repeat.ts";

Deno.test("repeat", async (t) => {
  await t.step("usage", () => {
    const result = pipe([0, 1, 2], repeat(2));
    const expected = [0, 1, 2, 0, 1, 2];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
