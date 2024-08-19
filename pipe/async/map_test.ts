import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { map } from "./map.ts";

test("map usage", async () => {
  const result = pipe(
    [1, 2, 3, 4, 5],
    map((v) => v * 2),
  );
  const expected = [2, 4, 6, 8, 10];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
