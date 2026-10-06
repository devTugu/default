const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time from plain text or markdown content.
 * Strips markdown syntax and counts words at ~200 WPM.
 */
export function readingTime(text: string | null | undefined): number {
  if (!text?.trim()) {
    return 1;
  }

  const plain = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#>*_~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const wordCount = plain.split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
