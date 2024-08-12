import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { enumerate } from "./enumerate.ts";

Deno.test("enumerate", async (t) => {
  await t.step("usage 1", () => {
    const result = pipe(["a", "b", "c"], enumerate());
    const expected = [[0, "a"], [1, "b"], [2, "c"]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, string]>>>(true);
  });

  await t.step("usage 2", () => {
    const result = pipe(["a", "b", "c"], enumerate(1));
    const expected = [[1, "a"], [2, "b"], [3, "c"]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, string]>>>(true);
  });

  await t.step("usage 3", () => {
    const result = pipe(["a", "b", "c"], enumerate(1, 2));
    const expected = [[1, "a"], [3, "b"], [5, "c"]];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<[number, string]>>>(true);
  });
});
