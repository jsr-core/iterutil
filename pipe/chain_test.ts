import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { chain } from "./chain.ts";

Deno.test("chain", async (t) => {
  await t.step("usage", () => {
    const result = pipe(
      [1, 2, 3],
      chain(["a", "b"], [true]),
    );
    const expected = [1, 2, 3, "a", "b", true];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number | string | boolean>>>(
      true,
    );
  });
});
