import { useState, useEffect, useCallback } from 'react';
import { Article, SearchFilters, NewsSource } from '../types';
import { fetchNewsApiArticles } from '../services/newsApi';
import { fetchGuardianArticles } from '../services/guardianApi';
import { fetchNYTimesArticles } from '../services/nytimesApi';

export const useArticles = (
  initialFilters: SearchFilters,
  sources: NewsSource[]
) => {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  // This function fetches articles from APIs - only triggered on keyword search or refresh
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const articlePromises: Promise<Article[]>[] = [];
      // Create a simplified filter object with only the keyword for API requests
      const apiFilters = { keyword: filters.keyword };

      if (sources.includes('newsapi')) {
        articlePromises.push(fetchNewsApiArticles(apiFilters));
      }

      if (sources.includes('guardian')) {
        articlePromises.push(fetchGuardianArticles(apiFilters));
      }

      if (sources.includes('nytimes')) {
        articlePromises.push(fetchNYTimesArticles(apiFilters));
      }

      const articlesFromAllSources = await Promise.all(articlePromises);
      const flattenedArticles = articlesFromAllSources.flat();

      // Sort by date (newest first)
      const sortedArticles = flattenedArticles.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      setAllArticles(sortedArticles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  }, [filters.keyword, sources]);

  // Apply client-side filtering whenever filters or allArticles change
  useEffect(() => {
    applyClientFilters();
  }, [filters, allArticles]);

  // Initial load
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Function to apply client-side filters
  const applyClientFilters = useCallback(() => {
    let result = [...allArticles];

    // Filter by category
    if (filters.category) {
      result = result.filter(
        (article) => article.category === filters.category
      );
    }

    // Filter by source
    if (filters.source) {
      result = result.filter((article) => article.source.id === filters.source);
    }

    // Filter by source
    if (filters.author) {
      result = result.filter((article) =>
        article.author?.includes(filters.author as string)
      );
    }

    // Filter by date range
    if (filters.dateFrom && filters.dateTo) {
      const fromDate = new Date(filters.dateFrom);
      const toDate = new Date(filters.dateTo);

      // Set to end of day
      toDate.setHours(23, 59, 59, 999);
      result = result.filter(
        (article) =>
          new Date(article.publishedAt) >= fromDate &&
          new Date(article.publishedAt) <= toDate
      );
    }

    setFilteredArticles(result);
  }, [allArticles, filters]);

  // This function updates filters
  const updateFilters = useCallback(
    (newFilters: Partial<SearchFilters>) => {
      setFilters((prev) => {
        const updated = { ...prev, ...newFilters };

        // Only trigger API fetch if keyword changes
        if (
          newFilters.keyword !== undefined &&
          newFilters.keyword !== prev.keyword
        ) {
          // trigger the fetch in the next tick to ensure state is updated
          setTimeout(() => fetchArticles(), 0);
        }

        return updated;
      });
    },
    [fetchArticles]
  );

  const clearFilters = () => {
    setFilteredArticles(allArticles);
    setFilters(initialFilters);
  };

  // Function to manually refresh articles
  const refreshArticles = useCallback(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles: filteredArticles,
    loading,
    error,
    filters,
    updateFilters,
    refreshArticles,
    clearFilters,
  };
};
