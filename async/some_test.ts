import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { some } from "./some.ts";

await test("some with async iterable true", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await some(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (v, index) => {
      values.push(v);
      indices.push(index);
      return v > 2;
    },
  );
  const expected = true;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3]);
  assertEquals(indices, [0, 1, 2]);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("some with async iterable false", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await some(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (v, index) => {
      values.push(v);
      indices.push(index);
      return v > 5;
    },
  );
  const expected = false;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("some with iterable true", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await some([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v > 2;
  });
  const expected = true;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3]);
  assertEquals(indices, [0, 1, 2]);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("some with iterable false", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await some([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v > 5;
  });
  const expected = false;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, boolean>>(true);
});
