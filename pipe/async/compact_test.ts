import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { compact } from "./compact.ts";

await test("compact usage", async () => {
  const result = pipe([1, undefined, 2, null, 3], compact);
  const expected = [1, 2, 3];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
