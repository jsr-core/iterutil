import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { zip } from "./zip.ts";

await test("zip with two iterables", () => {
  const result = zip([1, 2, 3], ["a", "b", "c"]);
  const expected = [[1, "a"], [2, "b"], [3, "c"]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, string]>>>(true);
});

await test("zip with two in-balanced iterables", () => {
  const result = zip([1, 2, 3, 4, 5], ["a", "b", "c"]);
  const expected = [[1, "a"], [2, "b"], [3, "c"]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, string]>>>(true);
});

await test("zip with three iterables", () => {
  const result = zip([1, 2, 3], ["a", "b", "c"], [true, false, true]);
  const expected = [[1, "a", true], [2, "b", false], [3, "c", true]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, string, boolean]>>>(
    true,
  );
});

await test("zip with three in-balanced iterables", () => {
  const result = zip([1, 2, 3, 4, 5], ["a", "b", "c"], [true, false, true]);
  const expected = [[1, "a", true], [2, "b", false], [3, "c", true]];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<[number, string, boolean]>>>(
    true,
  );
});
