import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { uniq } from "./uniq.ts";

Deno.test("uniq", async (t) => {
  await t.step("default", () => {
    const result = uniq([1, 2, 2, 3, 3, 3]);
    const expected = [1, 2, 3];
    assertEquals(Array.from(result), expected);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });

  await t.step("with identify", () => {
    const values: number[] = [];
    const indices: number[] = [];
    const identities: number[] = [];
    const result = uniq(
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      (v, index) => {
        values.push(v);
        indices.push(index);
        const id = v % 4;
        identities.push(id);
        return id;
      },
    );
    const expected = [1, 2, 3, 4];
    assertEquals(Array.from(result), expected);
    assertEquals(values, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    assertEquals(indices, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    assertEquals(identities, [1, 2, 3, 0, 1, 2, 3, 0, 1]);
    assertType<IsExact<typeof result, Iterable<number>>>(true);
  });
});
