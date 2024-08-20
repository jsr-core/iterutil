import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { filter } from "./filter.ts";

test("filter usage", () => {
  const result = pipe(
    [1, 2, 3, 4, 5],
    filter((v) => v % 2 === 0),
  );
  const expected = [2, 4];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});

test("filter usage with type predicate", () => {
  const predicate = (v: number | string): v is number => typeof v === "number";
  const result = pipe(
    [1, "a", 2, "b", 3],
    filter(predicate),
  );
  const expected = [1, 2, 3];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
