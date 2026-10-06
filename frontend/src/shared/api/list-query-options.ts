import { keepPreviousData } from '@tanstack/react-query';

export const listQueryOptions = {
  staleTime: 60_000,
  placeholderData: keepPreviousData,
};
