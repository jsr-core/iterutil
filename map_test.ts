import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { map } from "./map.ts";

Deno.test("map", () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = map([1, 2, 3, 4, 5], (value, index) => {
    values.push(value);
    indices.push(index);
    return value * 2;
  });
  const expected = [2, 4, 6, 8, 10];
  assertEquals([...result], expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
