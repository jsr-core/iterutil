import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { take } from "./take.ts";
import { cycle } from "./cycle.ts";

Deno.test("cycle", async (t) => {
  await t.step("usage", async () => {
    const result = pipe([0, 1, 2], cycle, take(5));
    const expected = [0, 1, 2, 0, 1];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });
});
