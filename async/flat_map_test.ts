import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { flatMap } from "./flat_map.ts";

await test("flatMap with async iterable single nest", async () => {
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
  assertEquals(await Array.fromAsync(result), expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("flatMap with async iterable single async iterable nest", async () => {
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
  assertEquals(await Array.fromAsync(result), expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("flatMap with async iterable single promise nest", async () => {
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
  assertEquals(await Array.fromAsync(result), expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("flatMap with async iterable multi nest", async () => {
  const result = flatMap(toAsyncIterable([1, 2, 3, 4, 5]), (v) => [[v, v]]);
  const expected = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});

await test("flatMap with iterable single nest", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = flatMap([1, 2, 3, 4, 5], (value, index) => {
    values.push(value);
    indices.push(index);
    return [value, value];
  });
  const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("flatMap with iterable single async iterable nest", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = flatMap([1, 2, 3, 4, 5], (value, index) => {
    values.push(value);
    indices.push(index);
    return toAsyncIterable([value, value]);
  });
  const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("flatMap with iterable single promise nest", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = flatMap([1, 2, 3, 4, 5], (value, index) => {
    values.push(value);
    indices.push(index);
    return Promise.resolve([value, value]);
  });
  const expected = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("flatMap with iterable multi nest", async () => {
  const result = flatMap([1, 2, 3, 4, 5], (v) => [[v, v]]);
  const expected = [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
});
