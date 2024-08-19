import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { enumerate } from "./enumerate.ts";

await test("enumerate usage 1", async () => {
  const result = pipe(["a", "b", "c"], enumerate());
  const expected = [[0, "a"], [1, "b"], [2, "c"]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, string]>>>(true);
});

await test("enumerate usage 2", async () => {
  const result = pipe(["a", "b", "c"], enumerate(1));
  const expected = [[1, "a"], [2, "b"], [3, "c"]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, string]>>>(true);
});

await test("enumerate usage 3", async () => {
  const result = pipe(["a", "b", "c"], enumerate(1, 2));
  const expected = [[1, "a"], [3, "b"], [5, "c"]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, string]>>>(true);
});
