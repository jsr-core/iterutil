import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { reduce } from "./reduce.ts";

Deno.test("reduce", async (t) => {
  await t.step("with initial", () => {
    const accumulators: number[] = [];
    const values: number[] = [];
    const indices: number[] = [];
    const result = reduce([1, 2, 3, 4, 5], (acc, value, index) => {
      accumulators.push(acc);
      values.push(value);
      indices.push(index);
      return acc + value;
    }, 5);
    assertEquals(result, 20);
    assertEquals(accumulators, [5, 6, 8, 11, 15]);
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
    assertType<IsExact<typeof result, number>>(true);
  });

  await t.step("without initial", () => {
    const accumulators: number[] = [];
    const values: number[] = [];
    const indices: number[] = [];
    const result = reduce([1, 2, 3, 4, 5], (acc, value, index) => {
      accumulators.push(acc);
      values.push(value);
      indices.push(index);
      return acc + value;
    });
    assertEquals(result, 15);
    assertEquals(accumulators, [1, 3, 6, 10]);
    assertEquals(values, [2, 3, 4, 5]);
    assertEquals(indices, [1, 2, 3, 4]);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });

  await t.step("without initial / with empty iterable", () => {
    const result = reduce([] as number[], (acc, v) => acc + v);
    assertEquals(result, undefined);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });
});
