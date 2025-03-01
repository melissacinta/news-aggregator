import { Article, NewsApiResponse, SearchFilters } from '../types';
import { API_KEYS, buildSearchParams, handleApiError } from './apiUtils';

export const fetchNewsApiArticles = async (
  filters: SearchFilters
): Promise<Article[]> => {
  try {
    const params = buildSearchParams(filters);

    // For NewsAPI, we need to fetch all categories when no keyword is provided
    if (!filters.keyword) {
      params.append('language', 'en'); // Default to english news if no keyword
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?${params.toString()}`,
      {
        headers: {
          'X-Api-Key': API_KEYS.newsApi,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`NewsAPI responded with status: ${response.status}`);
    }

    const data: NewsApiResponse = await response.json();

    return data.articles.map((article) => ({
      id: `newsapi-${article.url}`,
      title: article.title,
      description: article.description || '',
      content: article.content,
      url: article.url,
      imageUrl: article.urlToImage,
      author: article.author,
      source: {
        id: article.source.id || 'newsapi',
        name: article.source.name || 'NewsAPI',
      },
      category: article.category || detectCategoryFromTitle(article.title),
      publishedAt: article.publishedAt,
    }));
  } catch (error) {
    return handleApiError(error);
  }
};

// Helper function to detect category from title
function detectCategoryFromTitle(title: string): any {
  const lowerTitle = title.toLowerCase();

  if (/business|economy|market|stock|finance|money/.test(lowerTitle))
    return 'business';
  if (/tech|digital|software|app|computer|cyber|ai|robot/.test(lowerTitle))
    return 'technology';
  if (
    /entertainment|movie|film|celebrity|actor|music|game|tv|television/.test(
      lowerTitle
    )
  )
    return 'entertainment';
  if (
    /health|covid|virus|medical|doctor|hospital|disease|patient/.test(
      lowerTitle
    )
  )
    return 'health';
  if (/science|research|study|experiment|discovery/.test(lowerTitle))
    return 'science';
  if (
    /sport|football|basketball|soccer|tennis|baseball|nfl|nba|athlete/.test(
      lowerTitle
    )
  )
    return 'sports';

  return 'general';
}
