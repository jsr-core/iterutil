import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { reduce } from "./reduce.ts";

Deno.test("reduce", async (t) => {
  await t.step("usage 1", async () => {
    const result = await pipe(
      [1, 2, 3, 4, 5],
      reduce((acc, v) => acc + v),
    );
    assertEquals(result, 15);
    assertType<IsExact<typeof result, number | undefined>>(true);
  });

  await t.step("usage 2", async () => {
    const result = await pipe(
      [1, 2, 3, 4, 5],
      reduce((acc, v) => acc + v, ""),
    );
    assertEquals(result, "12345");
    assertType<IsExact<typeof result, string>>(true);
  });
});
