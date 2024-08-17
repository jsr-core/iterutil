import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { dropWhile } from "./drop_while.ts";

await test("dropWhile usage", () => {
  const result = pipe(
    [0, 1, 2, 3, 4],
    dropWhile((v) => v < 2),
  );
  const expected = [2, 3, 4];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
