import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { dropWhile } from "./drop_while.ts";

await test("dropWhile with some true", () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = dropWhile([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v < 3;
  });
  const expected = [3, 4, 5];
  assertEquals(Array.from(result), expected);
  assertEquals(values, [1, 2, 3]);
  assertEquals(indices, [0, 1, 2]);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("dropWhile with all true", () => {
  const result = dropWhile([1, 2, 3, 4, 5], () => true);
  const expected: number[] = [];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("dropWhile with all false", () => {
  const result = dropWhile([1, 2, 3, 4, 5], () => false);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
