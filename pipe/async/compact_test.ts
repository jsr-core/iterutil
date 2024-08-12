import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { compact } from "./compact.ts";

Deno.test("compact", async (t) => {
  await t.step("usage", async () => {
    const result = pipe([1, undefined, 2, null, 3], compact);
    const expected = [1, 2, 3];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });
});
