import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { take } from "./take.ts";
import { cycle } from "./cycle.ts";

Deno.test("cycle", async (t) => {
  await t.step("with non empty iterable", () => {
    const result = cycle([0, 1, 2]);
    const expected = [0, 1, 2, 0, 1];
    assertEquals([...take(result, 5)], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with single value iterable", () => {
    const result = cycle([0]);
    const expected = [0, 0, 0, 0, 0];
    assertEquals([...take(result, 5)], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with empty iterable", () => {
    const result = cycle([] as number[]);
    const expected: number[] = [];
    assertEquals([...take(result, 5)], expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
