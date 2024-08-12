import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { chain } from "./chain.ts";

Deno.test("chain", async (t) => {
  await t.step("with empty iterables", () => {
    const result = chain([] as number[], [] as string[]);
    const expected = [] as (number | string)[];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number | string>>>(true);
  });

  await t.step("with iterables", () => {
    const result = chain(
      [1, 2, 3],
      ["a", "b"],
    );
    const expected = [1, 2, 3, "a", "b"];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number | string>>>(true);
  });

  await t.step("with multiple iterables", () => {
    const result = chain(
      [1, 2, 3],
      ["a", "b"],
      [true],
    );
    const expected = [1, 2, 3, "a", "b", true];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number | string | boolean>>>(
      true,
    );
  });
});
