import { generateSlug, generateUniqueSlug } from './generate-slug';

describe('generateSlug', () => {
  it('slugifies title', () => {
    expect(generateSlug('My Cool Project!')).toBe('my-cool-project');
  });

  it('appends suffix for unique slug', () => {
    expect(generateUniqueSlug('my-project', 2)).toBe('my-project-2');
  });
});
