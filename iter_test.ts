import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { iter } from "./iter.ts";

Deno.test("iter", () => {
  const it = iter([0, 1, 2, 3, 4, 5]);
  assertEquals(it.next(), { done: false, value: 0 });
  assertEquals(it.next(), { done: false, value: 1 });
  assertEquals(Array.from(it), [2, 3, 4, 5]);
  assertType<IsExact<typeof it, IterableIterator<number>>>(true);
});
