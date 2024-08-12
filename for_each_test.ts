import { assertEquals } from "@std/assert";
import { forEach } from "./for_each.ts";

Deno.test("forEach", () => {
  const values: number[] = [];
  const indices: number[] = [];
  forEach([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
  });
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
});
