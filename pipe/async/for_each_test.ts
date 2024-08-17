import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { pipe } from "@core/pipe";
import { forEach } from "./for_each.ts";

test("forEach usage", async () => {
  const values: number[] = [];
  await pipe(
    [1, 2, 3, 4, 5],
    forEach((v) => void values.push(v)),
  );
  assertEquals(values, [1, 2, 3, 4, 5]);
});
