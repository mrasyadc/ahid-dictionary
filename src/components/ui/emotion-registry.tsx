"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

export function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "css" });
    cache.compat = true;
    const prevInsert = cache.insert.bind(cache);
    const inserted: string[] = [];
    cache.insert = (...args) => {
      const [, serialized] = args;
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prev = [...inserted];
      inserted.length = 0;
      return prev;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return;
    const styles = names
      .map((name) => cache.inserted[name])
      .filter(Boolean)
      .join(" ");
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
