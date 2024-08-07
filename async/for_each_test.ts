import { assertEquals } from "@std/assert";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { forEach } from "./for_each.ts";

Deno.test("forEach", async (t) => {
  await t.step("with async iterable", async () => {
    const values: number[] = [];
    const indices: number[] = [];
    await forEach(toAsyncIterable([1, 2, 3, 4, 5]), (value, index) => {
      values.push(value);
      indices.push(index);
    });
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
  });

  await t.step("with async iterable (promise)", async () => {
    const values: number[] = [];
    const indices: number[] = [];
    await forEach(toAsyncIterable([1, 2, 3, 4, 5]), (value, index) => {
      values.push(value);
      indices.push(index);
      return Promise.resolve();
    });
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
  });

  await t.step("with iterable", async () => {
    const values: number[] = [];
    const indices: number[] = [];
    await forEach([1, 2, 3, 4, 5], (value, index) => {
      values.push(value);
      indices.push(index);
    });
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
  });

  await t.step("with iterable (promise)", async () => {
    const values: number[] = [];
    const indices: number[] = [];
    await forEach([1, 2, 3, 4, 5], (value, index) => {
      values.push(value);
      indices.push(index);
      return Promise.resolve();
    });
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
  });
});
