import { Article, NYTimesApiResponse, SearchFilters } from '../types';
import { API_KEYS, buildSearchParams, handleApiError } from './apiUtils';

export const fetchNYTimesArticles = async (
  filters: SearchFilters
): Promise<Article[]> => {
  try {
    const params = buildSearchParams(filters, 'nyt');
    params.append('api-key', API_KEYS.nytimes);
    // Fetch a broad set of articles
    params.append('sort', 'newest');

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
      // Map NYT section names to our category types
      category: mapNYTSectionToCategory(article.section_name),
      publishedAt: article.pub_date,
    }));
  } catch (error) {
    return handleApiError(error);
  }
};

// Helper function to map NYT sections to our category types
function mapNYTSectionToCategory(section?: string): any {
  if (!section) return 'general';

  const mapping: { [key: string]: any } = {
    Business: 'business',
    Technology: 'technology',
    Sports: 'sports',
    Science: 'science',
    Health: 'health',
    Arts: 'entertainment',
    World: 'general',
    'U.S.': 'general',
    Politics: 'general',
  };

  return mapping[section] || 'general';
}
