import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { enumerate } from "./enumerate.ts";

Deno.test("enumerate", async (t) => {
  await t.step("default", () => {
    const result = enumerate([0, 1, 2]);
    const expected = [[0, 0], [1, 1], [2, 2]];
    assertEquals([...result], expected);
    assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
  });

  await t.step("with start", () => {
    const result = enumerate([0, 1, 2], 1);
    const expected = [[1, 0], [2, 1], [3, 2]];
    assertEquals([...result], expected);
    assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
  });

  await t.step("with start/step", () => {
    const result = enumerate([0, 1, 2], 1, 2);
    const expected = [[1, 0], [3, 1], [5, 2]];
    assertEquals([...result], expected);
    assertType<IsExact<typeof result, Iterable<[number, number]>>>(true);
  });
});
