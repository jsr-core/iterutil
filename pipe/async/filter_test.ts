import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { filter } from "./filter.ts";

test("filter usage", async () => {
  const result = pipe(
    [1, 2, 3, 4, 5],
    filter((v) => v % 2 === 0),
  );
  const expected = [2, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
