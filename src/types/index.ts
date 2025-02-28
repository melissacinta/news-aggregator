// News source identifiers
export type NewsSource = 'newsapi' | 'guardian' | 'nytimes';

// Category types
export type Category =
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

// Article interface that works across different news APIs
export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  url: string;
  imageUrl?: string;
  author?: string;
  source: {
    id: string;
    name: string;
  };
  category?: Category;
  publishedAt: string;
}

// User preferences for personalized news feed
export interface UserPreferences {
  sources: NewsSource[];
  categories: Category[];
  authors: string[];
}

// Search filters
export interface SearchFilters {
  keyword: string;
  dateFrom?: string;
  dateTo?: string;
  author?: string;
  category?: Category;
  source?: NewsSource;
}

// API response types for each news source
export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: any[];
}

export interface GuardianApiResponse {
  response: {
    status: string;
    total: number;
    results: any[];
  };
}

export interface NYTimesApiResponse {
  status: string;
  copyright: string;
  response: {
    docs: any[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
}
