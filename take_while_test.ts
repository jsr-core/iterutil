import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { takeWhile } from "./take_while.ts";

await test("takeWhile with some true", () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = takeWhile([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v < 3;
  });
  const expected = [1, 2];
  assertEquals(Array.from(result), expected);
  assertEquals(values, [1, 2, 3]);
  assertEquals(indices, [0, 1, 2]);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("takeWhile with all true", () => {
  const result = takeWhile([1, 2, 3, 4, 5], () => true);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("takeWhile with all false", () => {
  const result = takeWhile([1, 2, 3, 4, 5], () => false);
  const expected: number[] = [];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
