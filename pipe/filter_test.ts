import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { filter } from "./filter.ts";

Deno.test("filter", () => {
  const result = pipe(
    [1, 2, 3, 4, 5],
    filter((v) => v % 2 === 0),
  );
  const expected = [2, 4];
  assertEquals(Array.from(result), expected);
  assertType<IsExact<typeof result, Iterable<number>>>(true);
});
