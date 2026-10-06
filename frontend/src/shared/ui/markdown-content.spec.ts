import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MarkdownContent } from '@/shared/ui/markdown-content';

describe('MarkdownContent', () => {
  it('renders headings and paragraphs', () => {
    const html = renderToStaticMarkup(
      createElement(MarkdownContent, {
        content: 'Intro paragraph\n\n## Section\n\nDetail text',
      }),
    );
    expect(html).toContain('<h2');
    expect(html).toContain('Section');
    expect(html).toContain('Intro paragraph');
  });
});
