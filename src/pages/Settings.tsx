import React, { useState } from 'react';
import { usePreferencesContext } from '../contexts/PreferencesContext';
import { Category, NewsSource } from '../types';
import CheckBox from '../components/CheckBox';

const Settings: React.FC = () => {
  const { preferences, updateSources, updateCategories, resetPreferences } =
    usePreferencesContext();

  const [selectedSources, setSelectedSources] = useState<NewsSource[]>(
    preferences.sources
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    preferences.categories
  );

  const availableSources: { id: NewsSource; name: string }[] = [
    { id: 'newsapi', name: 'News API' },
    { id: 'guardian', name: 'The Guardian' },
    { id: 'nytimes', name: 'New York Times' },
  ];

  const availableCategories: { id: Category; name: string }[] = [
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'general', name: 'General' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
  ];

  const handleSourceChange = (source: NewsSource) => {
    setSelectedSources((prev) => {
      if (prev.includes(source)) {
        // Ensure at least one source is selected
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter((s) => s !== source);
      } else {
        return [...prev, source];
      }
    });
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        // Ensure at least one category is selected
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSave = () => {
    updateSources(selectedSources);
    updateCategories(selectedCategories);

    // Show success message briefly
    const element = document.getElementById('settings-saved');
    if (element) {
      element.classList.remove('hidden');
      setTimeout(() => {
        element.classList.add('hidden');
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Personalize Your News Feed</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">News Sources</h2>
        <p className="text-gray-600 mb-4">
          Select the news sources you want in your feed:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {availableSources.map((source) => (
            <div key={source.id} className="flex items-center space-x-2">
              <CheckBox
                id={`source-${source.id}`}
                name={`source-${source.id}`}
                checked={selectedSources.includes(source.id)}
                onChange={() => handleSourceChange(source.id)}
              />
              <label htmlFor={`source-${source.id}`} className="text-gray-700">
                {source.name}
              </label>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Preferred Categories</h2>
        <p className="text-gray-600 mb-4">
          Select the news categories you're interested in:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {availableCategories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <CheckBox
                id={`category-${category.id}`}
                name={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-gray-700"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between">
          <button
            onClick={handleSave}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:hover:bg-gray-500/70 transition-all duration-300 ease-linear mb-3 sm:mb-0"
          >
            Save Preferences
          </button>

          <button
            onClick={resetPreferences}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
          >
            Reset to Defaults
          </button>
        </div>

        <div
          id="settings-saved"
          className="hidden mt-4 p-3 bg-green-100 text-green-800 rounded"
        >
          Your preferences have been saved! Your news feed will now be updated.
        </div>
      </div>
    </div>
  );
};

export default Settings;
