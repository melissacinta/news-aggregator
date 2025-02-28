import { Article, GuardianApiResponse, SearchFilters } from '../types';
import { API_KEYS, buildSearchParams, handleApiError } from './apiUtils';

export const fetchGuardianArticles = async (
  filters: SearchFilters
): Promise<Article[]> => {
  try {
    const params = buildSearchParams(filters);
    params.append('api-key', API_KEYS.guardian);

    // Add a parameter to fetch all sections/categories
    params.append(
      'section',
      'business|entertainment|politics|world|technology|science|sport|health'
    );

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
      // Map Guardian sections to our category types
      category: mapGuardianSectionToCategory(article.sectionId),
      publishedAt: article.webPublicationDate,
    }));
  } catch (error) {
    return handleApiError(error);
  }
};

// Helper function to map Guardian sections to our category types
function mapGuardianSectionToCategory(section: string): any {
  const mapping: { [key: string]: any } = {
    business: 'business',
    technology: 'technology',
    sport: 'sports',
    science: 'science',
    lifeandstyle: 'health',
    culture: 'entertainment',
    politics: 'general',
    world: 'general',
  };

  return mapping[section] || 'general';
}
