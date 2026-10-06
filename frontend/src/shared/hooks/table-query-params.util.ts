interface FilterParamConfig {
  defaultValue?: string;
  omitFromQuery?: string[];
}

export function buildTableQueryParams(input: {
  page: number;
  limit: number;
  search: string;
  filters: Record<string, string>;
  filterParams: Record<string, FilterParamConfig>;
}): Record<string, string | number> {
  const params: Record<string, string | number> = {
    page: input.page,
    limit: input.limit,
    ...(input.search ? { search: input.search } : {}),
  };

  Object.entries(input.filters).forEach(([key, value]) => {
    const config = input.filterParams[key];
    if (!value || config?.omitFromQuery?.includes(value)) {
      return;
    }
    params[key] = value;
  });

  return params;
}
