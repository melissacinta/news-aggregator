// src/contexts/ArticlesContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Article, SearchFilters } from '../types';
import { useArticles } from '../hooks/useArticles';
import { usePreferencesContext } from './PreferencesContext';

interface ArticlesContextType {
  articles: Article[];
  loading: boolean;
  error: string | null;
  filters: SearchFilters;
  updateFilters: (newFilters: Partial<SearchFilters>) => void;
  refreshArticles: () => void;
  clearFilters: () => void;
  savedArticles: Article[];
  saveArticle: (article: Article) => void;
  removeSavedArticle: (articleId: string) => void;
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
);

export const useArticlesContext = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error(
      'useArticlesContext must be used within an ArticlesProvider'
    );
  }
  return context;
};

export const ArticlesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { preferences } = usePreferencesContext();
  const [savedArticles, setSavedArticles] = useState<Article[]>(() => {
    const stored = localStorage.getItem('saved-articles');
    return stored ? JSON.parse(stored) : [];
  });

  const initialFilters: SearchFilters = {
    keyword: '',
    category: preferences.categories[0],
  };

  const articlesHook = useArticles(initialFilters, preferences.sources);

  const saveArticle = (article: Article) => {
    setSavedArticles((prev) => {
      const updated = [...prev, article];
      localStorage.setItem('saved-articles', JSON.stringify(updated));
      return updated;
    });
  };

  const removeSavedArticle = (articleId: string) => {
    setSavedArticles((prev) => {
      const updated = prev.filter((article) => article.id !== articleId);
      localStorage.setItem('saved-articles', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ArticlesContext.Provider
      value={{
        ...articlesHook,
        savedArticles,
        saveArticle,
        removeSavedArticle,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
