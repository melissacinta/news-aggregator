import { Article, NYTimesApiResponse, SearchFilters } from '../types';
import { API_KEYS, buildSearchParams, handleApiError } from './apiUtils';

export const fetchNYTimesArticles = async (
  filters: SearchFilters
): Promise<Article[]> => {
  try {
    const params = buildSearchParams(filters, 'nyt');
    params.append('api-key', API_KEYS.nytimes);

    const response = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`NY Times API responded with status: ${response.status}`);
    }

    const data: NYTimesApiResponse = await response.json();

    return data.response.docs.map((article) => ({
      id: `nytimes-${article._id}`,
      title: article.headline.main,
      description: article.abstract || article.snippet || '',
      url: article.web_url,
      imageUrl:
        article.multimedia.length > 0
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : undefined,
      author: article.byline?.original?.replace('By ', '') || '',
      source: {
        id: 'nytimes',
        name: 'The New York Times',
      },
      category: article.section_name?.toLowerCase() as any,
      publishedAt: article.pub_date,
    }));
  } catch (error) {
    return handleApiError(error);
  }
};
