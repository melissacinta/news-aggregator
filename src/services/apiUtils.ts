import { SearchFilters } from '../types';

// API Keys would typically be stored in environment variables
export const API_KEYS = {
  newsApi: import.meta.env.VITE_NEWSAPI_KEY || 'your-newsapi-key',
  guardian: import.meta.env.VITE_GUARDIAN_KEY || 'your-guardian-key',
  nytimes: import.meta.env.VITE_NYTIMES_KEY || 'your-nytimes-key',
};

export const buildSearchParams = (
  filters: SearchFilters,
  source?: string
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.keyword) {
    params.append('q', filters.keyword);
  }

  if (filters.dateFrom) {
    params.append(source === 'nyt' ? 'begin_date' : 'from', filters.dateFrom);
  }

  if (filters.dateTo) {
    params.append(source === 'nyt' ? 'end_date' : 'to', filters.dateTo);
  }

  if (filters.category) {
    params.append(
      source === 'guardian'
        ? 'section'
        : source === 'nyt'
        ? 'news_desk'
        : 'category',
      filters.category
    );
  }

  return params;
};

// Common error handling
export const handleApiError = (error: unknown): never => {
  if (error instanceof Error) {
    console.error('API Error:', error.message);
    throw new Error(`Failed to fetch articles: ${error.message}`);
  }
  throw new Error('An unknown error occurred while fetching articles');
};
