import { Article, GuardianApiResponse, SearchFilters } from '../types';
import { API_KEYS, buildSearchParams, handleApiError } from './apiUtils';

export const fetchGuardianArticles = async (
  filters: SearchFilters
): Promise<Article[]> => {
  try {
    const params = buildSearchParams(filters, 'guardian');
    params.append('api-key', API_KEYS.guardian);

    const response = await fetch(
      `https://content.guardianapis.com/search?${params.toString()}&show-fields=headline,thumbnail,byline,bodyText`
    );

    if (!response.ok) {
      throw new Error(
        `The Guardian API responded with status: ${response.status}`
      );
    }

    const data: GuardianApiResponse = await response.json();

    return data.response.results.map((article) => ({
      id: `guardian-${article.id}`,
      title: article.webTitle,
      description: article.fields?.bodyText?.substring(0, 150) || '',
      url: article.webUrl,
      imageUrl: article.fields?.thumbnail,
      author: article.fields?.byline,
      source: {
        id: 'guardian',
        name: 'The Guardian',
      },
      category: article.sectionId as any,
      publishedAt: article.webPublicationDate,
    }));
  } catch (error) {
    return handleApiError(error);
  }
};
