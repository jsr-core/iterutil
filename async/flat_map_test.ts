import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { toArray } from "./to_array.ts";
import { flatMap } from "./flat_map.ts";

Deno.test("flatMap", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("single nest", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = flatMap(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (value, index) => {
          values.push(value);
          indices.push(index);
          return [value, value];
        },
      );
      const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
      assertEquals(await toArray(result), expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("single async iterable nest", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = flatMap(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (value, index) => {
          values.push(value);
          indices.push(index);
          return toAsyncIterable([value, value]);
        },
      );
      const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
      assertEquals(await toArray(result), expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("single promise nest", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = flatMap(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (value, index) => {
          values.push(value);
          indices.push(index);
          return Promise.resolve([value, value]);
        },
      );
      const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
      assertEquals(await toArray(result), expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("multi nest", async () => {
      const result = flatMap(toAsyncIterable([1, 2, 3, 4, 5]), (v) => [[v, v]]);
      const expected = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("single nest", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = flatMap([1, 2, 3, 4, 5], (value, index) => {
        values.push(value);
        indices.push(index);
        return [value, value];
      });
      const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
      assertEquals(await toArray(result), expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("single async iterable nest", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = flatMap([1, 2, 3, 4, 5], (value, index) => {
        values.push(value);
        indices.push(index);
        return toAsyncIterable([value, value]);
      });
      const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
      assertEquals(await toArray(result), expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("single promise nest", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = flatMap([1, 2, 3, 4, 5], (value, index) => {
        values.push(value);
        indices.push(index);
        return Promise.resolve([value, value]);
      });
      const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
      assertEquals(await toArray(result), expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("multi nest", async () => {
      const result = flatMap([1, 2, 3, 4, 5], (v) => [[v, v]]);
      const expected = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]];
      assertEquals(await toArray(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
    });
  });
});
