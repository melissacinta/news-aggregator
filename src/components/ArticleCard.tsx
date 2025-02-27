import React from 'react';
import { Article } from '../types';
// TODO: remove svg
interface ArticleCardProps {
  article: Article;
  onSave?: () => void;
  onRemove?: () => void;
  isSaved?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSave,
  onRemove,
  isSaved = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          {isSaved ? (
            <button
              onClick={onRemove}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              title="Remove from saved"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={onSave}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
              title="Save article"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {article.source.name}
          </span>
          <span className="text-gray-500 text-xs">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 hover:text-blue-600"
          >
            {article.title}
          </a>
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description || 'No description available'}
        </p>

        <div className="flex justify-between items-center mt-2">
          {article.author && (
            <span className="text-gray-500 text-xs">By {article.author}</span>
          )}
          {article.category && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
              {article.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
