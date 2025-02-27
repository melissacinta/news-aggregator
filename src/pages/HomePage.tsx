import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';
import Loader from '../components/Loader';
import { useArticlesContext } from '../contexts/ArticlesContext';
import { usePreferencesContext } from '../contexts/PreferencesContext';
import { Category, NewsSource } from '../types';

const HomePage: React.FC = () => {
  const {
    articles,
    loading,
    error,
    updateFilters,
    refreshArticles,
    savedArticles,
    saveArticle,
  } = useArticlesContext();

  const { preferences } = usePreferencesContext();
  const [allCategories] = useState<Category[]>([
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ]);

  // Get saved article IDs for checking if an article is saved
  const savedArticleIds = savedArticles.map((article) => article.id);

  useEffect(() => {
    // Refresh articles when preferred sources change
    refreshArticles();
  }, [preferences.sources, refreshArticles]);

  const handleSearch = (keyword: string) => {
    updateFilters({ keyword });
  };

  const handleFilterByDate = (from: string, to: string) => {
    updateFilters({
      dateFrom: from || undefined,
      dateTo: to || undefined,
    });
  };

  const handleFilterByCategory = (category?: Category) => {
    updateFilters({ category });
  };

  const handleFilterBySource = (source?: NewsSource) => {
    updateFilters({ source });
  };

  // if (error) {
  //   return (
  //     <div className="container mx-auto px-4 py-8">
  //       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
  //         <p>{error}</p>
  //         <button
  //           onClick={refreshArticles}
  //           className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  //         >
  //           Try Again
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>

      <SearchBar
        onSearch={handleSearch}
        onFilterByDate={handleFilterByDate}
        onFilterByCategory={handleFilterByCategory}
        onFilterBySource={handleFilterBySource}
        categories={allCategories}
        sources={preferences.sources}
      />
      {error && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <button
              onClick={refreshArticles}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <>
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No articles found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  isSaved={savedArticleIds.includes(article.id)}
                  onSave={() => saveArticle(article)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
