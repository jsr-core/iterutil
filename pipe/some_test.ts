import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { some } from "./some.ts";

await test("some usage 1", () => {
  const result = pipe([1, 2, 3], some((v) => v % 2 === 0));
  const expected = true;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("some usage 2", () => {
  const result = pipe([1, 3, 5], some((v) => v % 2 === 0));
  const expected = false;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, boolean>>(true);
});
