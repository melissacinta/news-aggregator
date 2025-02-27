import React, { useState } from 'react';
import { Category, NewsSource } from '../types';
// TODO: remove svg
interface SearchBarProps {
  onSearch: (keyword: string) => void;
  onFilterByDate: (from: string, to: string) => void;
  onFilterByCategory: (category?: Category) => void;
  onFilterBySource: (source?: NewsSource) => void;
  categories: Category[];
  sources: NewsSource[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterByDate,
  onFilterByCategory,
  onFilterBySource,
  categories,
  sources,
}) => {
  const [keyword, setKeyword] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);

    if (dateFrom || dateTo) {
      onFilterByDate(dateFrom, dateTo);
    }
  };

  const sourceDisplayNames: Record<NewsSource, string> = {
    newsapi: 'News API',
    guardian: 'The Guardian',
    nytimes: 'New York Times',
  };

  const categoryDisplayNames: Record<Category, string> = {
    business: 'Business',
    entertainment: 'Entertainment',
    general: 'General',
    health: 'Health',
    science: 'Science',
    sports: 'Sports',
    technology: 'Technology',
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search for news..."
              className="w-full p-2 border border-gray-300 rounded"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="text-blue-600 px-3 py-1 rounded flex items-center"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`ml-1 h-4 w-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="flex-1 p-2 border border-gray-300 rounded"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
                <span>to</span>
                <input
                  type="date"
                  className="flex-1 p-2 border border-gray-300 rounded"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) =>
                  onFilterByCategory((e.target.value as Category) || undefined)
                }
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {categoryDisplayNames[category]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) =>
                  onFilterBySource((e.target.value as NewsSource) || undefined)
                }
              >
                <option value="">All Sources</option>
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {sourceDisplayNames[source]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
