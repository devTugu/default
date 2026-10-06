import { describe, expect, it } from 'vitest';
import { buildTableQueryParams } from './table-query-params.util';

describe('buildTableQueryParams', () => {
  it('includes search and active filters', () => {
    const params = buildTableQueryParams({
      page: 2,
      limit: 20,
      search: 'alpha',
      filters: { status: 'NEW', featured: '' },
      filterParams: {
        status: { defaultValue: '' },
        featured: { defaultValue: '', omitFromQuery: [''] },
      },
    });

    expect(params).toEqual({
      page: 2,
      limit: 20,
      search: 'alpha',
      status: 'NEW',
    });
  });
});
