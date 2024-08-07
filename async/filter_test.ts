import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { toArray } from "./to_array.ts";
import { filter } from "./filter.ts";

Deno.test("filter", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("without promise", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = filter(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (value, index) => {
          values.push(value);
          indices.push(index);
          return value % 2 === 0;
        },
      );
      const expected = [2, 4];
      assertEquals(await toArray(result), expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with promise", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = filter(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (value, index) => {
          values.push(value);
          indices.push(index);
          return Promise.resolve(value % 2 === 0);
        },
      );
      const expected = [2, 4];
      assertEquals(await toArray(result), expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("without promise", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = filter([1, 2, 3, 4, 5], (value, index) => {
        values.push(value);
        indices.push(index);
        return value % 2 === 0;
      });
      const expected = [2, 4];
      assertEquals(await toArray(result), expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });

    await t.step("with promise", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = filter([1, 2, 3, 4, 5], (value, index) => {
        values.push(value);
        indices.push(index);
        return Promise.resolve(value % 2 === 0);
      });
      const expected = [2, 4];
      assertEquals(await toArray(result), expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
    });
  });
});
