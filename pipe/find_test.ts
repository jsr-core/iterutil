import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { find } from "./find.ts";

await test("find usage", () => {
  const result = pipe(
    [1, 2, 3, 4, 5],
    find((v) => v % 2 === 0),
  );
  const expected = 2;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});
