import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { chain } from "./chain.ts";

Deno.test("chain", async (t) => {
  await t.step("uniform iterables", () => {
    const result = chain([1, 2], [3, 4], [5]);
    const expected = [1, 2, 3, 4, 5];
    assertEquals([...result], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("malform iterables", () => {
    const result = chain([1, 2], ["a", "b"], [true]);
    const expected = [1, 2, "a", "b", true];
    assertEquals([...result], expected);
    assertType<IsExact<typeof result, Iterable<number | string | boolean>>>(
      true,
    );
  });
});
