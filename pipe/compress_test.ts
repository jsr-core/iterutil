import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { compress } from "./compress.ts";

await test("compress usage", () => {
  const result = pipe(
    [1, 2, 3, 4, 5],
    compress([true, false, true, false, true]),
  );
  const expected = [1, 3, 5];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
