import { test } from "@cross/test";
import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { enumerate } from "./enumerate.ts";

await test("enumerate with async iterable default", async () => {
  const result = enumerate(toAsyncIterable([0, 1, 2]));
  const expected = [[0, 0], [1, 1], [2, 2]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("enumerate with async iterable with positive start", async () => {
  const result = enumerate(toAsyncIterable([0, 1, 2]), 1);
  const expected = [[1, 0], [2, 1], [3, 2]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("enumerate with async iterable with negative start", async () => {
  const result = enumerate(toAsyncIterable([0, 1, 2]), -1);
  const expected = [[-1, 0], [0, 1], [1, 2]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("enumerate with async iterable with float start", async () => {
  const result = enumerate(toAsyncIterable([0, 1, 2]), 1.1);
  const expected = [[1.1, 0], [2.1, 1], [3.1, 2]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test(
  "enumerate with async iterable with start and positive step",
  async () => {
    const result = enumerate(toAsyncIterable([0, 1, 2]), 1, 2);
    const expected = [[1, 0], [3, 1], [5, 2]];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
  },
);

await test(
  "enumerate with async iterable with start and negative step",
  async () => {
    const result = enumerate(toAsyncIterable([0, 1, 2]), 1, -1);
    const expected = [[1, 0], [0, 1], [-1, 2]];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
  },
);

await test(
  "enumerate with async iterable with start and float step",
  async () => {
    const result = enumerate(toAsyncIterable([0, 1, 2]), 1, 0.2);
    const expected = [[1, 0], [1.2, 1], [1.4, 2]];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
  },
);

await test("enumerate with iterable default", async () => {
  const result = enumerate([0, 1, 2]);
  const expected = [[0, 0], [1, 1], [2, 2]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("enumerate with iterable with positive start", async () => {
  const result = enumerate([0, 1, 2], 1);
  const expected = [[1, 0], [2, 1], [3, 2]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("enumerate with iterable with negative start", async () => {
  const result = enumerate([0, 1, 2], -1);
  const expected = [[-1, 0], [0, 1], [1, 2]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test("enumerate with iterable with float start", async () => {
  const result = enumerate([0, 1, 2], 1.1);
  const expected = [[1.1, 0], [2.1, 1], [3.1, 2]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test(
  "enumerate with iterable with start and positive step",
  async () => {
    const result = enumerate([0, 1, 2], 1, 2);
    const expected = [[1, 0], [3, 1], [5, 2]];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
  },
);

await test(
  "enumerate with iterable with start and negative step",
  async () => {
    const result = enumerate([0, 1, 2], 1, -1);
    const expected = [[1, 0], [0, 1], [-1, 2]];
    assertEquals(await Array.fromAsync(result), expected);
    assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
  },
);

await test("enumerate with iterable with start and float step", async () => {
  const result = enumerate([0, 1, 2], 1, 0.2);
  const expected = [[1, 0], [1.2, 1], [1.4, 2]];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<[number, number]>>>(true);
});

await test(
  "enumerate with iterable throws RangeError if the start is not finite",
  () => {
    assertThrows(() => enumerate([], NaN), RangeError);
    assertThrows(
      () => enumerate([], Infinity),
      RangeError,
    );
    assertThrows(
      () => enumerate([], -Infinity),
      RangeError,
    );
  },
);

await test(
  "enumerate with iterable throws RangeError if the step is not finite",
  () => {
    assertThrows(() => enumerate([], 0, NaN), RangeError);
    assertThrows(
      () => enumerate([], 0, Infinity),
      RangeError,
    );
    assertThrows(
      () => enumerate([], 0, -Infinity),
      RangeError,
    );
  },
);

await test(
  "enumerate with iterable throws RangeError if the step is 0",
  () => {
    assertThrows(() => enumerate([], 0, 0), RangeError);
  },
);
