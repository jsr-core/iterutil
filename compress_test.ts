import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { compress } from "./compress.ts";

await test("compress the iterable and the selectors are same length", () => {
  const result = compress([1, 2, 3, 4, 5], [true, false, true, false, true]);
  const expected = [1, 3, 5];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("compress the iterable is larger than the selectors", () => {
  const result = compress([1, 2, 3, 4, 5], [true, false, true]);
  const expected = [1, 3];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("compress the iterable is smaller than the selector", () => {
  const result = compress([1, 2, 3], [true, false, true, false, true]);
  const expected = [1, 3];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
