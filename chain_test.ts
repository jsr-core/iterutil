import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { chain } from "./chain.ts";

await test("chain with empty iterables", () => {
  const result = chain([] as number[], [] as string[]);
  const expected = [] as (number | string)[];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number | string>>>(true);
});

await test("chain with iterables", () => {
  const result = chain(
    [1, 2, 3],
    ["a", "b"],
  );
  const expected = [1, 2, 3, "a", "b"];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number | string>>>(true);
});

await test("chain with multiple iterables", () => {
  const result = chain(
    [1, 2, 3],
    ["a", "b"],
    [true],
  );
  const expected = [1, 2, 3, "a", "b", true];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number | string | boolean>>>(
    true,
  );
});
