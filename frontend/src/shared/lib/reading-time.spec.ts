import { describe, expect, it } from 'vitest';
import { readingTime } from './reading-time';

describe('readingTime', () => {
  it('returns 1 for empty content', () => {
    expect(readingTime('')).toBe(1);
    expect(readingTime(null)).toBe(1);
  });

  it('counts words and rounds up at 200 WPM', () => {
    const words = Array.from({ length: 400 }, (_, index) => `word${index}`).join(' ');
    expect(readingTime(words)).toBe(2);
  });

  it('strips markdown before counting', () => {
    const markdown = '# Title\n\n**Bold** and `code` and [link](https://example.com)';
    expect(readingTime(markdown)).toBe(1);
  });
});
