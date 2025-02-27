import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SavedArticles from './pages/SavedArticles';
import Settings from './pages/Settings';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { ArticlesProvider } from './contexts/ArticlesContext';

const App: React.FC = () => {
  return (
    <PreferencesProvider>
      <ArticlesProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/saved" element={<SavedArticles />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
            <footer className="bg-gray-800 text-white py-6">
              <div className="container mx-auto px-4">
                <p className="text-center">
                  © {new Date().getFullYear()} News Aggregator - All rights
                  reserved
                </p>
              </div>
            </footer>
          </div>
        </Router>
      </ArticlesProvider>
    </PreferencesProvider>
  );
};

export default App;
