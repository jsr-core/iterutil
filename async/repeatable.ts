export function repeatable<T>(iterable: AsyncIterable<T>): AsyncIterable<T> {
  const cache: T[] = [];
  let buildingCache: Promise<void> | undefined = undefined;
  let pendingResolvers: ((value: T) => void)[] = [];
  let finished = false;

  return {
    [Symbol.asyncIterator]: async function* () {
      yield* cache;

      if (!finished) {
        if (!buildingCache) {
          buildingCache = (async () => {
            try {
              for await (const item of iterable) {
                cache.push(item);
                pendingResolvers.forEach((resolve) => resolve(item));
                pendingResolvers = [];
              }
            } finally {
              finished = true;
            }
          })();
        }
      }
      let index = cache.length;
      while (!finished || index < cache.length) {
        if (index < cache.length) {
          yield cache[index++];
        } else {
          const nextItem = await new Promise<T>((resolve) => {
            pendingResolvers.push(resolve);
          });
          yield nextItem;
          index++;
        }
      }
    },
  };
}
