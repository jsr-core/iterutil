import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { uniq } from "./uniq.ts";

await test("uniq with async iterable default", async () => {
  const result = uniq(
    toAsyncIterable([1, 2, 2, 3, 3, 3]),
  );
  const expected = [1, 2, 3];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("uniq with async iterable with identify", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const identities: number[] = [];
  const result = uniq(
    toAsyncIterable([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    (v, index) => {
      values.push(v);
      indices.push(index);
      const id = v % 4;
      identities.push(id);
      return id;
    },
  );
  const expected = [1, 2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertEquals(values, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assertEquals(indices, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  assertEquals(identities, [1, 2, 3, 0, 1, 2, 3, 0, 1]);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("uniq with async iterable with identify promise", async () => {
  const result = uniq(
    toAsyncIterable([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    (v) => Promise.resolve(v % 4),
  );
  const expected = [1, 2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("uniq with iterable default", async () => {
  const result = uniq([1, 2, 2, 3, 3, 3]);
  const expected = [1, 2, 3];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("uniq with iterable with identify", async () => {
  const values: number[] = [];
  const indices: number[] = [];
  const identities: number[] = [];
  const result = uniq(
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    (v, index) => {
      values.push(v);
      indices.push(index);
      const id = v % 4;
      identities.push(id);
      return id;
    },
  );
  const expected = [1, 2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertEquals(values, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assertEquals(indices, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  assertEquals(identities, [1, 2, 3, 0, 1, 2, 3, 0, 1]);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});

await test("uniq with iterable with identify promise", async () => {
  const result = uniq(
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    (v) => Promise.resolve(v % 4),
  );
  const expected = [1, 2, 3, 4];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
