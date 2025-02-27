import { useState, useEffect, useCallback } from 'react';
import { UserPreferences, NewsSource, Category } from '../types';

const STORAGE_KEY = 'news-aggregator-preferences';

const defaultPreferences: UserPreferences = {
  sources: ['newsapi', 'guardian', 'nytimes'],
  categories: ['general', 'technology', 'business'],
  authors: [],
};

export const usePreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const storedPreferences = localStorage.getItem(STORAGE_KEY);
    return storedPreferences
      ? JSON.parse(storedPreferences)
      : defaultPreferences;
  });

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const updateSources = useCallback((sources: NewsSource[]) => {
    setPreferences((prev) => ({ ...prev, sources }));
  }, []);

  const updateCategories = useCallback((categories: Category[]) => {
    setPreferences((prev) => ({ ...prev, categories }));
  }, []);

  const updateAuthors = useCallback((authors: string[]) => {
    setPreferences((prev) => ({ ...prev, authors }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
  }, []);

  return {
    preferences,
    updateSources,
    updateCategories,
    updateAuthors,
    resetPreferences,
  };
};
