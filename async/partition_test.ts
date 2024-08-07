import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { partition } from "./partition.ts";

Deno.test("partition", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const [left, right] = await partition(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (value, index) => {
          values.push(value);
          indices.push(index);
          return value % 2 === 0;
        },
      );
      assertEquals(left, [2, 4]);
      assertEquals(right, [1, 3, 5]);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof left, number[]>>(true);
      assertType<IsExact<typeof right, number[]>>(true);
    });

    await t.step("with non empty iterable (promise)", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const [left, right] = await partition(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (value, index) => {
          values.push(value);
          indices.push(index);
          return Promise.resolve(value % 2 === 0);
        },
      );
      assertEquals(left, [2, 4]);
      assertEquals(right, [1, 3, 5]);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof left, number[]>>(true);
      assertType<IsExact<typeof right, number[]>>(true);
    });

    await t.step("with empty iterable", async () => {
      const [left, right] = await partition(
        toAsyncIterable([] as number[]),
        (v) => v % 2 === 0,
      );
      assertEquals(left, []);
      assertEquals(right, []);
      assertType<IsExact<typeof left, number[]>>(true);
      assertType<IsExact<typeof right, number[]>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("with non empty iterable", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const [left, right] = await partition([1, 2, 3, 4, 5], (value, index) => {
        values.push(value);
        indices.push(index);
        return value % 2 === 0;
      });
      assertEquals(left, [2, 4]);
      assertEquals(right, [1, 3, 5]);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof left, number[]>>(true);
      assertType<IsExact<typeof right, number[]>>(true);
    });

    await t.step("with non empty iterable (promise)", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const [left, right] = await partition([1, 2, 3, 4, 5], (value, index) => {
        values.push(value);
        indices.push(index);
        return Promise.resolve(value % 2 === 0);
      });
      assertEquals(left, [2, 4]);
      assertEquals(right, [1, 3, 5]);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof left, number[]>>(true);
      assertType<IsExact<typeof right, number[]>>(true);
    });

    await t.step("with empty iterable", async () => {
      const [left, right] = await partition([] as number[], (v) => v % 2 === 0);
      assertEquals(left, []);
      assertEquals(right, []);
      assertType<IsExact<typeof left, number[]>>(true);
      assertType<IsExact<typeof right, number[]>>(true);
    });
  });
});
