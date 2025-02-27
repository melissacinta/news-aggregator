import React from 'react';
import ArticleCard from '../components/ArticleCard';
import { useArticlesContext } from '../contexts/ArticlesContext';

const SavedArticles: React.FC = () => {
  const { savedArticles, removeSavedArticle } = useArticlesContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Saved Articles</h1>

      {savedArticles.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">
            You haven't saved any articles yet.
          </p>
          <a href="/" className="text-blue-500 hover:text-blue-700">
            Browse the latest news to save articles
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isSaved={true}
              onRemove={() => removeSavedArticle(article.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticles;
