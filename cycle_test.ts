import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { take } from "./take.ts";
import { cycle } from "./cycle.ts";

await test("cycle with non empty iterable", () => {
  const result = cycle([0, 1, 2]);
  const expected = [0, 1, 2, 0, 1];
  assertEquals(Array.from(take(result, 5)), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("cycle with single value iterable", () => {
  const result = cycle([0]);
  const expected = [0, 0, 0, 0, 0];
  assertEquals(Array.from(take(result, 5)), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

await test("cycle with empty iterable", () => {
  const result = cycle([] as number[]);
  const expected: number[] = [];
  assertEquals(Array.from(take(result, 5)), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
