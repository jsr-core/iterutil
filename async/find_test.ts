import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { find } from "./find.ts";

Deno.test("find", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("found", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await find(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (value, index) => {
          values.push(value);
          indices.push(index);
          return value % 2 === 0;
        },
      );
      const expected = 2;
      assertEquals(result, expected);
      assertEquals(values, [1, 2]);
      assertEquals(indices, [0, 1]);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });

    await t.step("promise found", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await find(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (value, index) => {
          values.push(value);
          indices.push(index);
          return Promise.resolve(value % 2 === 0);
        },
      );
      const expected = 2;
      assertEquals(result, expected);
      assertEquals(values, [1, 2]);
      assertEquals(indices, [0, 1]);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });

    await t.step("not found", async () => {
      const result = await find(toAsyncIterable([1, 2, 3, 4, 5]), () => false);
      const expected = undefined;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("found", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await find([1, 2, 3, 4, 5], (value, index) => {
        values.push(value);
        indices.push(index);
        return value % 2 === 0;
      });
      const expected = 2;
      assertEquals(result, expected);
      assertEquals(values, [1, 2]);
      assertEquals(indices, [0, 1]);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });

    await t.step("promise found", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await find([1, 2, 3, 4, 5], (value, index) => {
        values.push(value);
        indices.push(index);
        return Promise.resolve(value % 2 === 0);
      });
      const expected = 2;
      assertEquals(result, expected);
      assertEquals(values, [1, 2]);
      assertEquals(indices, [0, 1]);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });

    await t.step("not found", async () => {
      const result = await find([1, 2, 3, 4, 5], () => false);
      const expected = undefined;
      assertEquals(result, expected);
      assertType<IsExact<typeof result, number | undefined>>(true);
    });
  });
});
