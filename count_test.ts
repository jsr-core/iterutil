import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { take } from "./take.ts";
import { count } from "./count.ts";

Deno.test("count", async (t) => {
  await t.step("default", () => {
    const result = count();
    const expected = [0, 1, 2];
    assertEquals([...take(result, 3)], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with start", () => {
    const result = count(2);
    const expected = [2, 3, 4];
    assertEquals([...take(result, 3)], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with start/step", () => {
    const result = count(2, 2);
    const expected = [2, 4, 6];
    assertEquals([...take(result, 3)], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
