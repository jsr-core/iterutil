import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { compact } from "./compact.ts";

await test("compact without undefined/null", () => {
  const result = compact([1, 2, 3, 4, 5]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("compact with undefined", () => {
  const result = compact([
    undefined,
    1,
    2,
    undefined,
    3,
    undefined,
    4,
    5,
    undefined,
  ]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("compact with null", () => {
  const result = compact([null, 1, 2, null, 3, null, 4, 5, null]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("compact with undefined/null", () => {
  const result = compact([undefined, 1, 2, null, 3, undefined, 4, 5, null]);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
