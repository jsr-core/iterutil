import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { map } from "./map.ts";

Deno.test("map", async (t) => {
  await t.step("with async iterable", async () => {
    const values: number[] = [];
    const indices: number[] = [];
    const result = map(toAsyncIterable([1, 2, 3, 4, 5]), (value, index) => {
      values.push(value);
      indices.push(index);
      return value * 2;
    });
    const expected = [2, 4, 6, 8, 10];
    assertEquals(await Array.fromAsync(result), expected);
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });

  await t.step("with iterable (promise)", async () => {
    const values: number[] = [];
    const indices: number[] = [];
    const result = map(toAsyncIterable([1, 2, 3, 4, 5]), (value, index) => {
      values.push(value);
      indices.push(index);
      return Promise.resolve(value * 2);
    });
    const expected = [2, 4, 6, 8, 10];
    assertEquals(await Array.fromAsync(result), expected);
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });

  await t.step("with iterable", async () => {
    const values: number[] = [];
    const indices: number[] = [];
    const result = map([1, 2, 3, 4, 5], (value, index) => {
      values.push(value);
      indices.push(index);
      return value * 2;
    });
    const expected = [2, 4, 6, 8, 10];
    assertEquals(await Array.fromAsync(result), expected);
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });

  await t.step("with iterable (promise)", async () => {
    const values: number[] = [];
    const indices: number[] = [];
    const result = map([1, 2, 3, 4, 5], (value, index) => {
      values.push(value);
      indices.push(index);
      return Promise.resolve(value * 2);
    });
    const expected = [2, 4, 6, 8, 10];
    assertEquals(await Array.fromAsync(result), expected);
    assertEquals(values, [1, 2, 3, 4, 5]);
    assertEquals(indices, [0, 1, 2, 3, 4]);
    assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
  });
});
