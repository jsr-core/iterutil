import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { reduce } from "./reduce.ts";

await test("reduce with async iterable with initial", async () => {
  const accumulators: number[] = [];
  const values: number[] = [];
  const indices: number[] = [];
  const result = await reduce(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (acc, value, index) => {
      accumulators.push(acc);
      values.push(value);
      indices.push(index);
      return acc + value;
    },
    5,
  );
  assertEquals(result, 20);
  assertEquals(accumulators, [5, 6, 8, 11, 15]);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, number>>(true);
});

await test("reduce with async iterable with initial promise", async () => {
  const accumulators: number[] = [];
  const values: number[] = [];
  const indices: number[] = [];
  const result = await reduce(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (acc, value, index) => {
      accumulators.push(acc);
      values.push(value);
      indices.push(index);
      return Promise.resolve(acc + value);
    },
    5,
  );
  assertEquals(result, 20);
  assertEquals(accumulators, [5, 6, 8, 11, 15]);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, number>>(true);
});

await test("reduce with async iterable without initial", async () => {
  const accumulators: number[] = [];
  const values: number[] = [];
  const indices: number[] = [];
  const result = await reduce(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (acc, value, index) => {
      accumulators.push(acc);
      values.push(value);
      indices.push(index);
      return acc + value;
    },
  );
  assertEquals(result, 15);
  assertEquals(accumulators, [1, 3, 6, 10]);
  assertEquals(values, [2, 3, 4, 5]);
  assertEquals(indices, [1, 2, 3, 4]);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("reduce with async iterable without initial promise", async () => {
  const accumulators: number[] = [];
  const values: number[] = [];
  const indices: number[] = [];
  const result = await reduce(
    toAsyncIterable([1, 2, 3, 4, 5]),
    (acc, value, index) => {
      accumulators.push(acc);
      values.push(value);
      indices.push(index);
      return Promise.resolve(acc + value);
    },
  );
  assertEquals(result, 15);
  assertEquals(accumulators, [1, 3, 6, 10]);
  assertEquals(values, [2, 3, 4, 5]);
  assertEquals(indices, [1, 2, 3, 4]);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("reduce with async iterable without initial / with empty iterable", async () => {
  const result = await reduce(
    toAsyncIterable([] as number[]),
    (acc, v) => acc + v,
  );
  assertEquals(result, undefined);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("reduce with iterable with initial", async () => {
  const accumulators: number[] = [];
  const values: number[] = [];
  const indices: number[] = [];
  const result = await reduce([1, 2, 3, 4, 5], (acc, value, index) => {
    accumulators.push(acc);
    values.push(value);
    indices.push(index);
    return acc + value;
  }, 5);
  assertEquals(result, 20);
  assertEquals(accumulators, [5, 6, 8, 11, 15]);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, number>>(true);
});

await test("reduce with iterable with initial promise", async () => {
  const accumulators: number[] = [];
  const values: number[] = [];
  const indices: number[] = [];
  const result = await reduce([1, 2, 3, 4, 5], (acc, value, index) => {
    accumulators.push(acc);
    values.push(value);
    indices.push(index);
    return Promise.resolve(acc + value);
  }, 5);
  assertEquals(result, 20);
  assertEquals(accumulators, [5, 6, 8, 11, 15]);
  assertEquals(values, [1, 2, 3, 4, 5]);
  assertEquals(indices, [0, 1, 2, 3, 4]);
  assertType<IsExact<typeof result, number>>(true);
});

await test("reduce with iterable without initial", async () => {
  const accumulators: number[] = [];
  const values: number[] = [];
  const indices: number[] = [];
  const result = await reduce([1, 2, 3, 4, 5], (acc, value, index) => {
    accumulators.push(acc);
    values.push(value);
    indices.push(index);
    return acc + value;
  });
  assertEquals(result, 15);
  assertEquals(accumulators, [1, 3, 6, 10]);
  assertEquals(values, [2, 3, 4, 5]);
  assertEquals(indices, [1, 2, 3, 4]);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("reduce with iterable without initial promise", async () => {
  const accumulators: number[] = [];
  const values: number[] = [];
  const indices: number[] = [];
  const result = await reduce([1, 2, 3, 4, 5], (acc, value, index) => {
    accumulators.push(acc);
    values.push(value);
    indices.push(index);
    return Promise.resolve(acc + value);
  });
  assertEquals(result, 15);
  assertEquals(accumulators, [1, 3, 6, 10]);
  assertEquals(values, [2, 3, 4, 5]);
  assertEquals(indices, [1, 2, 3, 4]);
  assertType<IsExact<typeof result, number | undefined>>(true);
});

await test("reduce with iterable without initial / with empty iterable", async () => {
  const result = await reduce([] as number[], (acc, v) => acc + v);
  assertEquals(result, undefined);
  assertType<IsExact<typeof result, number | undefined>>(true);
});
