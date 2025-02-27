import { Article, NewsApiResponse, SearchFilters } from '../types';
import { API_KEYS, buildSearchParams, handleApiError } from './apiUtils';

export const fetchNewsApiArticles = async (
  filters: SearchFilters
): Promise<Article[]> => {
  try {
    const params = buildSearchParams(filters);

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
      category: article.category,
      publishedAt: article.publishedAt,
    }));
  } catch (error) {
    return handleApiError(error);
  }
};
