export type SearchQuery =
  | { mode: 'pair';   termA: string; termB: string }
  | { mode: 'multi';  terms: string[] }
  | { mode: 'single'; term: string }
  | { mode: 'empty' }

export function parseSearch(raw: string): SearchQuery {
  const trimmed = raw.trim();

  if (!trimmed) return { mode: 'empty' };

  // Pair mode: "Rubella vs Dengue"
  const vsMatch = trimmed.match(/^(.+?)\s+vs\s+(.+)$/i);
  if (vsMatch) {
    return {
      mode: 'pair',
      termA: vsMatch[1].trim(),
      termB: vsMatch[2].trim(),
    };
  }

  // Multi mode: "Rubella, Dengue" or "Rubella,Dengue"
  if (trimmed.includes(',')) {
    const terms = trimmed.split(',').map(t => t.trim()).filter(Boolean);
    if (terms.length > 1) return { mode: 'multi', terms };
  }

  // Single mode fallback
  return { mode: 'single', term: trimmed };
}

/** Returns true if a disease name matches a given parsed query */
export function matchesSingle(name: string, query: SearchQuery): boolean {
  const lower = name.toLowerCase();
  switch (query.mode) {
    case 'empty':  return true;
    case 'single': return lower.includes(query.term.toLowerCase());
    case 'multi':  return query.terms.some(t => lower.includes(t.toLowerCase()));
    case 'pair':   return (
      lower.includes(query.termA.toLowerCase()) ||
      lower.includes(query.termB.toLowerCase())
    );
  }
}

/** Returns true if a similarity row matches the pair/multi/single query */
export function matchesRow(
  d1: string,
  d2: string,
  query: SearchQuery
): boolean {
  const l1 = d1.toLowerCase();
  const l2 = d2.toLowerCase();

  switch (query.mode) {
    case 'empty':
      return true;
    case 'single': {
      const t = query.term.toLowerCase();
      return l1.includes(t) || l2.includes(t);
    }
    case 'multi':
      return query.terms.some(
        t => l1.includes(t.toLowerCase()) || l2.includes(t.toLowerCase())
      );
    case 'pair': {
      const a = query.termA.toLowerCase();
      const b = query.termB.toLowerCase();
      return (l1.includes(a) && l2.includes(b)) ||
             (l1.includes(b) && l2.includes(a));
    }
  }
}
