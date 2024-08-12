import { assertEquals } from "@std/assert";
import { pipe } from "@core/pipe";
import * as rootMod from "@core/iterutil";
import * as asyncMod from "@core/iterutil/async";
import * as pipeMod from "@core/iterutil/pipe";
import * as pipeAsyncMod from "@core/iterutil/pipe/async";

Deno.test("README", async (t) => {
  await t.step("case 1", () => {
    const iter = rootMod.map([1, 2, 3], (v) => v * 2);
    assertEquals(Array.from(iter), [2, 4, 6]);
  });

  await t.step("case 2", async () => {
    const iter = asyncMod.map([1, 2, 3], (v) => Promise.resolve(v * 2));
    assertEquals(await Array.fromAsync(iter), [2, 4, 6]);
  });

  await t.step("case 3", () => {
    const iter = pipe(
      [1, 2, 3],
      pipeMod.map((v) => v * 2),
      pipeMod.cycle,
      pipeMod.take(10),
      pipeMod.filter((v) => v % 2 === 0),
    );
    assertEquals(Array.from(iter), [2, 4, 6, 2, 4, 6, 2, 4, 6, 2]);
  });

  await t.step("case 4", async () => {
    const iter = pipe(
      [1, 2, 3],
      pipeAsyncMod.map((v) => v * 2),
      pipeAsyncMod.cycle,
      pipeAsyncMod.take(10),
      pipeAsyncMod.filter((v) => v % 2 === 0),
    );
    assertEquals(await Array.fromAsync(iter), [2, 4, 6, 2, 4, 6, 2, 4, 6, 2]);
  });
});
