import React, { createContext, useContext, ReactNode } from 'react';
import { UserPreferences, NewsSource, Category } from '../types';
import { usePreferences } from '../hooks/usePreferences';

interface PreferencesContextType {
  preferences: UserPreferences;
  updateSources: (sources: NewsSource[]) => void;
  updateCategories: (categories: Category[]) => void;
  updateAuthors: (authors: string[]) => void;
  resetPreferences: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

export const usePreferencesContext = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error(
      'usePreferencesContext must be used within a PreferencesProvider'
    );
  }
  return context;
};

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const preferencesHook = usePreferences();

  return (
    <PreferencesContext.Provider value={preferencesHook}>
      {children}
    </PreferencesContext.Provider>
  );
};
