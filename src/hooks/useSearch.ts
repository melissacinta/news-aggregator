import { useState, useCallback } from 'react';
import { SearchFilters, Category, NewsSource } from '../types';

const defaultFilters: SearchFilters = {
  keyword: '',
  dateFrom: undefined,
  dateTo: undefined,
  category: undefined,
  source: undefined,
};

export const useSearch = () => {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const updateKeyword = useCallback((keyword: string) => {
    setFilters((prev) => ({ ...prev, keyword }));
  }, []);

  const updateDateRange = useCallback((dateFrom?: string, dateTo?: string) => {
    setFilters((prev) => ({ ...prev, dateFrom, dateTo }));
  }, []);

  const updateCategory = useCallback((category?: Category) => {
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const updateSource = useCallback((source?: NewsSource) => {
    setFilters((prev) => ({ ...prev, source }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return {
    filters,
    updateKeyword,
    updateDateRange,
    updateCategory,
    updateSource,
    resetFilters,
  };
};
