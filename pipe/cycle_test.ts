import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { take } from "./take.ts";
import { cycle } from "./cycle.ts";

await test("cycle usage", () => {
  const result = pipe([0, 1, 2], cycle, take(5));
  const expected = [0, 1, 2, 0, 1];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
