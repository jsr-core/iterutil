import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toArray } from "./to_array.ts";

Deno.test("toArray", () => {
  const result = toArray(function* () {
    yield 1 as number;
    yield 2 as number;
    yield 3 as number;
  }());
  const expected = [1, 2, 3];
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number[]>>(true);
});
