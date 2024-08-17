import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { every } from "./every.ts";

await test("every with async iterable true", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await every(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (v, index) => {
      values.push(v);
      indices.push(index);
      return v < 6;
    },
  );
  const expected = true;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("every with async iterable false", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await every(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (v, index) => {
      values.push(v);
      indices.push(index);
      return v < 3;
    },
  );
  const expected = false;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3]);
  assertEquals(indices, [0, 1, 2]);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("every with async iterable promise true", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await every(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (v, index) => {
      values.push(v);
      indices.push(index);
      return Promise.resolve(v < 6);
    },
  );
  const expected = true;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("pevery with async iterable romise false", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await every(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (v, index) => {
      values.push(v);
      indices.push(index);
      return Promise.resolve(v < 3);
    },
  );
  const expected = false;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3]);
  assertEquals(indices, [0, 1, 2]);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("every with iterable true", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await every([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v < 6;
  });
  const expected = true;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("every with iterable false", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await every([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v < 3;
  });
  const expected = false;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3]);
  assertEquals(indices, [0, 1, 2]);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("every with iterable promise true", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await every(
    [1, 2, 3, 4, 5],
    (v, index) => {
      values.push(v);
      indices.push(index);
      return Promise.resolve(v < 6);
    },
  );
  const expected = true;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, boolean>>(true);
});

await test("every with iterable promise false", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await every(
    [1, 2, 3, 4, 5],
    (v, index) => {
      values.push(v);
      indices.push(index);
      return Promise.resolve(v < 3);
    },
  );
  const expected = false;
  assertEquals(result, expected);
  assertEquals(values, [1, 2, 3]);
  assertEquals(indices, [0, 1, 2]);
  assertType<IsExact<typeof result, boolean>>(true);
});
