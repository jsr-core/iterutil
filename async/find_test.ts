import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { find } from "./find.ts";

await test("find with async iterable found", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await find(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (v, index) => {
      values.push(v);
      indices.push(index);
      return v % 2 === 0;
    },
  );
  const expected = 2;
  assertEquals(result, expected);
  assertEquals(values, [1, 2]);
  assertEquals(indices, [0, 1]);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("find with async iterable promise found", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await find(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (v, index) => {
      values.push(v);
      indices.push(index);
      return Promise.resolve(v % 2 === 0);
    },
  );
  const expected = 2;
  assertEquals(result, expected);
  assertEquals(values, [1, 2]);
  assertEquals(indices, [0, 1]);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("find with async iterable not found", async () => {
  const result = await find(toAsyncIterable([1, 2, 3, 4, 5]), () => false);
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("find with iterable found", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await find([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v % 2 === 0;
  });
  const expected = 2;
  assertEquals(result, expected);
  assertEquals(values, [1, 2]);
  assertEquals(indices, [0, 1]);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("find with iterable promise found", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = await find([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return Promise.resolve(v % 2 === 0);
  });
  const expected = 2;
  assertEquals(result, expected);
  assertEquals(values, [1, 2]);
  assertEquals(indices, [0, 1]);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("find with iterable not found", async () => {
  const result = await find([1, 2, 3, 4, 5], () => false);
  const expected = undefined;
  assertEquals(result, expected);
  assertType<IsExact<typeof result, number | undefined>>(true);
});
