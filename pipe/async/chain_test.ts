import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { chain } from "./chain.ts";

await test("chain usage", async () => {
  const result = pipe(
    [1, 2, 3],
    chain(["a", "b"], [true]),
  );
  const expected = [1, 2, 3, "a", "b", true];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<
    IsExact<typeof result, AsyncIterable<number | string | boolean>>
  >(
    true,
  );
});
