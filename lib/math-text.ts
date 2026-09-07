import katex from 'katex';

export type MathPart = { raw: string; tex?: string; display?: boolean };

/** Split only explicitly delimited math; unmatched delimiters remain readable text. */
export function splitMath(value: string): MathPart[] {
  const parts: MathPart[] = [];
  const delimiters = [
    ['$$', '$$', true],
    ['\\[', '\\]', true],
    ['\\(', '\\)', false],
    ['$', '$', false],
  ] as const;
  const escaped = (index: number) => {
    let count = 0;
    while (index > 0 && value[--index] === '\\') count++;
    return count % 2 === 1;
  };
  let start = 0;
  for (let i = 0; i < value.length; i++) {
    if (escaped(i)) continue;
    // Code is literal, including fenced code and inline backticks.
    if (value[i] === '`') {
      const marker = value.slice(i).match(/^`+/)![0];
      const end = value.indexOf(marker, i + marker.length);
      if (end >= 0) i = end + marker.length - 1;
      continue;
    }
    const delimiter = delimiters.find(([open]) => value.startsWith(open, i));
    if (!delimiter) continue;
    const [open, close, display] = delimiter;
    let end = value.indexOf(close, i + open.length);
    while (end >= 0 && escaped(end))
      end = value.indexOf(close, end + close.length);
    if (end < 0) continue;
    const tex = value.slice(i + open.length, end);
    if (!tex.trim() || (!display && tex.includes('\n'))) continue;
    if (i > start) parts.push({ raw: value.slice(start, i) });
    parts.push({ raw: value.slice(i, end + close.length), tex, display });
    i = end + close.length - 1;
    start = i + 1;
  }
  if (start < value.length) parts.push({ raw: value.slice(start) });
  return parts;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

/** Build-time rendering: no browser JS, network, HTML trust, or shared macros. */
export function renderMathText(value: string): string {
  return splitMath(value)
    .map((part) => {
      if (part.tex === undefined) return escapeHtml(part.raw);
      try {
        return katex.renderToString(part.tex, {
          displayMode: part.display,
          trust: false,
          strict: 'ignore',
          throwOnError: true,
          maxExpand: 1000,
          maxSize: 20,
        });
      } catch {
        return `<span class="math-fallback" title="公式暂无法解析，保留原文">${escapeHtml(part.raw)}</span>`;
      }
    })
    .join('');
}

export function mathMarkdown(
  value: string,
  escapeText: (text: string) => string,
): string {
  return splitMath(value)
    .map((part) => {
      if (part.tex === undefined) return escapeText(part.raw);
      // Leave TeX commands intact while preventing raw HTML/Liquid in exported Markdown.
      if (/[<>]|\{\{|\{%/.test(part.tex)) return escapeText(part.raw);
      return part.display
        ? `\n\n$$\n${part.tex.trim()}\n$$\n\n`
        : `$${part.tex}$`;
    })
    .join('');
}
