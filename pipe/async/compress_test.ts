import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { compress } from "./compress.ts";

Deno.test("compress", async (t) => {
  await t.step("usage", async () => {
    const result = pipe(
      [1, 2, 3, 4, 5],
      compress([true, false, true, false, true]),
    );
    const expected = [1, 3, 5];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });
});
