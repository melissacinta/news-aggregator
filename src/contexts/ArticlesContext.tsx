// src/contexts/ArticlesContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from 'react';
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
  filterByAuthor: (author?: string) => void;
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

  const [authorFilter, setAuthorFilter] = useState<string | undefined>(
    undefined
  );

  const initialFilters: SearchFilters = {
    keyword: '',
    category: preferences.categories[0],
  };

  const articlesHook = useArticles(initialFilters, preferences.sources);

  // Apply author filtering client-side
  const filteredArticles = useMemo(() => {
    if (!authorFilter) return articlesHook.articles;

    return articlesHook.articles.filter((article) =>
      article.author?.toLowerCase().includes(authorFilter.toLowerCase())
    );
  }, [articlesHook.articles, authorFilter]);

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

  const filterByAuthor = (author?: string) => {
    setAuthorFilter(author);
  };

  return (
    <ArticlesContext.Provider
      value={{
        ...articlesHook,
        articles: filteredArticles, // Use the filtered articles instead
        savedArticles,
        saveArticle,
        removeSavedArticle,
        filterByAuthor,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
