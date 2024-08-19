import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { partition } from "./partition.ts";

await test("partition usage", () => {
  const [left, right] = pipe(
    [1, 2, 3, 4, 5],
    partition((v) => v % 2 === 0),
  );
  assertEquals(left, [2, 4]);
  assertEquals(right, [1, 3, 5]);
  assertType<IsExact<typeof left, number[]>>(true);
  assertType<IsExact<typeof right, number[]>>(true);
});
