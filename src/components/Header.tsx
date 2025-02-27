import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <Link to="/" className="text-white hover:text-gray-200">
              News Aggregator
            </Link>
          </div>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className={`hover:text-gray-200 ${
                    location.pathname === '/' ? 'text-blue-400' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/saved"
                  className={`hover:text-gray-200 ${
                    location.pathname === '/saved' ? 'text-blue-400' : ''
                  }`}
                >
                  Saved Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className={`hover:text-gray-200 ${
                    location.pathname === '/settings' ? 'text-blue-400' : ''
                  }`}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
