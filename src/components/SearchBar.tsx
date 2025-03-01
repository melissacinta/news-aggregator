// src/components/SearchBar.tsx
import React, { useState } from 'react';
import { Category, NewsSource, SearchFilters } from '../types';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  categories: Category[];
  sources: NewsSource[];
  clearFilters: () => void;
  filters: SearchFilters;
  updateFilters: (filter: Partial<SearchFilters>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  categories,
  sources,
  clearFilters,
  updateFilters,
  filters,
}) => {
  const [keyword, setKeyword] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword);
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
            className="text-gray-800 hover:text-gray-700 px-3 py-1 rounded flex items-center"
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
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-500/70 transition-all duration-300 ease-linear"
          >
            Search
          </button>
        </div>

        {isExpanded && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={filters?.dateFrom || ''}
                    onChange={(e) => {
                      updateFilters({ dateFrom: e.target.value });
                    }}
                  />
                  <span>to</span>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={filters?.dateTo || ''}
                    onChange={(e) => {
                      updateFilters({ dateTo: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={filters?.category || ''}
                  onChange={(e) =>
                    updateFilters({
                      category: (e.target.value as Category) || undefined,
                    })
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
                  value={filters?.source || ''}
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) =>
                    updateFilters({
                      source: (e.target.value as NewsSource) || undefined,
                    })
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  placeholder="Filter by author..."
                  className="w-full p-2 border border-gray-300 rounded"
                  value={filters?.author || ''}
                  onChange={(e) =>
                    updateFilters({
                      author: e.target.value || undefined,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  // Reset all filters
                  clearFilters();
                }}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
