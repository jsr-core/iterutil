import { test } from "@cross/test";
import { delay } from "@std/async/delay";
import { assertEquals } from "@std/assert";
import { repeatable } from "./repeatable.ts";

async function* delayedGenerator(sideEffect?: () => void) {
  yield 1;
  await delay(100);
  yield 2;
  await delay(100);
  yield 3;
  sideEffect?.();
}

await test("repeatable should return the same sequence on multiple iterations", async () => {
  const input = delayedGenerator();
  const it = repeatable(input);

  const result1 = await Array.fromAsync(it);
  const result2 = await Array.fromAsync(it);

  assertEquals(result1, [1, 2, 3], "First iteration");
  assertEquals(result2, [1, 2, 3], "First iteration");
});

await test("repeatable should call internal iterator only once", async () => {
  let called = 0;
  const input = delayedGenerator(() => called++);
  const it = repeatable(input);

  const result1 = await Array.fromAsync(it);
  const result2 = await Array.fromAsync(it);

  assertEquals(result1, [1, 2, 3], "First iteration");
  assertEquals(result2, [1, 2, 3], "First iteration");
  assertEquals(called, 1, "Internal iterator called only once");
});

await test("repeatable should work correctly when consumed partially and then fully", async () => {
  const input = delayedGenerator();
  const it = repeatable(input);

  const result1: number[] = [];
  const firstIter = it[Symbol.asyncIterator]();

  result1.push((await firstIter.next()).value); // 1

  const result2 = await Array.fromAsync(it);

  result1.push((await firstIter.next()).value); // 2
  result1.push((await firstIter.next()).value); // 3

  assertEquals(result1, [1, 2, 3], "First iteration");
  assertEquals(result2, [1, 2, 3], "First iteration");
});

await test("repeatable should cache values and return them immediately on subsequent iterations", async () => {
  const input = delayedGenerator();
  const it = repeatable(input);

  const start = performance.now();
  const result1 = await Array.fromAsync(it);
  const end1 = performance.now();
  const timeTaken1 = end1 - start;

  const start2 = performance.now();
  const result2 = await Array.fromAsync(it);
  const end2 = performance.now();
  const timeTaken2 = end2 - start2;

  assertEquals(result1, [1, 2, 3], "First iteration");
  assertEquals(result2, [1, 2, 3], "Second iteration");

  console.debug("Time taken for first consume:", timeTaken1);
  console.debug("Time taken for second consume (with cache):", timeTaken2);

  if (timeTaken2 > timeTaken1 / 10) {
    throw new Error(
      "Second consume took too long, cache might not be working.",
    );
  }
});
