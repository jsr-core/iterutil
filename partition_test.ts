import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { partition } from "./partition.ts";

await test("partition with non empty iterable", () => {
  const values: number[] = [];
  const indices: number[] = [];
  const [left, right] = partition([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v % 2 === 0;
  });
  assertEquals(left, [2, 4]);
  assertEquals(right, [1, 3, 5]);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof left, number[]>>(true);
  assertType<IsExact<typeof right, number[]>>(true);
});

await test("partition with empty iterable", () => {
  const [left, right] = partition([] as number[], (v) => v % 2 === 0);
  assertEquals(left, []);
  assertEquals(right, []);
  assertType<IsExact<typeof left, number[]>>(true);
  assertType<IsExact<typeof right, number[]>>(true);
});
