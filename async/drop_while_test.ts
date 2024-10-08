import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { dropWhile } from "./drop_while.ts";

await test("dropWhile with async iterable with some true", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = dropWhile(toAsyncIterable([1, 2, 3, 4, 5]), (v, index) => {
    values.push(v);
    indices.push(index);
    return v < 3;
  });
  const expected = [3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertEquals(values, [1, 2, 3]);
  assertEquals(indices, [0, 1, 2]);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("dropWhile with async iterable with some promise true", async () => {
  const result = dropWhile(
    toAsyncIterable([0, 1, 2, 3, 4]),
    (v) => Promise.resolve(v < 2),
  );
  const expected = [2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("dropWhile with async iterable with all true", async () => {
  const result = dropWhile(toAsyncIterable([0, 1, 2, 3, 4]), () => true);
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("dropWhile with async iterable with all false", async () => {
  const result = dropWhile(toAsyncIterable([0, 1, 2, 3, 4]), () => false);
  const expected = [0, 1, 2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("dropWhile with iterable with some true", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const result = dropWhile([1, 2, 3, 4, 5], (v, index) => {
    values.push(v);
    indices.push(index);
    return v < 3;
  });
  const expected = [3, 4, 5];
  assertEquals(await Array.fromAsync(result), expected);
  assertEquals(values, [1, 2, 3]);
  assertEquals(indices, [0, 1, 2]);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("dropWhile with iterable with some promise true", async () => {
  const result = dropWhile([0, 1, 2, 3, 4], (v) => Promise.resolve(v < 2));
  const expected = [2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("dropWhile with iterable with all true", async () => {
  const result = dropWhile([0, 1, 2, 3, 4], () => true);
  const expected: number[] = [];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("dropWhile with iterable with all false", async () => {
  const result = dropWhile([0, 1, 2, 3, 4], () => false);
  const expected = [0, 1, 2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
