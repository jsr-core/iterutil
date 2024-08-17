import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { flatten } from "./flatten.ts";

await test("flatten usage", () => {
  const result = pipe([[1, 2], [3, 4], [5]], flatten);
  const expected = [1, 2, 3, 4, 5];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
