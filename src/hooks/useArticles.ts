import { useState, useEffect, useCallback } from 'react';
import { Article, SearchFilters, NewsSource } from '../types';
import { fetchNewsApiArticles } from '../services/newsApi';
import { fetchGuardianArticles } from '../services/guardianApi';
import { fetchNYTimesArticles } from '../services/nytimesApi';

export const useArticles = (
  initialFilters: SearchFilters,
  sources: NewsSource[]
) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const articlePromises: Promise<Article[]>[] = [];

      if (sources.includes('newsapi')) {
        articlePromises.push(fetchNewsApiArticles(filters));
      }

      if (sources.includes('guardian')) {
        articlePromises.push(fetchGuardianArticles(filters));
      }

      if (sources.includes('nytimes')) {
        articlePromises.push(fetchNYTimesArticles(filters));
      }

      const articlesFromAllSources = await Promise.all(articlePromises);
      const flattenedArticles = articlesFromAllSources.flat();

      // Sort by date (newest first)
      const sortedArticles = flattenedArticles.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      setArticles(sortedArticles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  }, [filters, sources]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const refreshArticles = useCallback(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    filters,
    updateFilters,
    refreshArticles,
  };
};
