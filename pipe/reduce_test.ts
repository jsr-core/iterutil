import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { reduce } from "./reduce.ts";

await test("reduce usage 1", () => {
  const result = pipe(
    [1, 2, 3, 4, 5],
    reduce((acc, v) => acc + v),
  );
  assertEquals(result, 15);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("reduce usage 2", () => {
  const result = pipe(
    [1, 2, 3, 4, 5],
    reduce((acc, v) => acc + v, ""),
  );
  assertEquals(result, "12345");
  assertType<IsExact<typeof result, string>>(true);
});
