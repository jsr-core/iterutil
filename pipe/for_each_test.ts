import { assertEquals } from "@std/assert";
import { pipe } from "@core/pipe";
import { forEach } from "./for_each.ts";

Deno.test("forEach", () => {
  const values: number[] = [];
  pipe(
    [1, 2, 3, 4, 5],
    forEach((v) => values.push(v)),
  );
  assertEquals(values, [1, 2, 3, 4, 5]);
});
