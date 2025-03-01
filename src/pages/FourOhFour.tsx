import { Link } from 'react-router-dom';

const FourOhFour = () => {
  return (
    <div className="w-full h-full py-20">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 md:p-10 text-center mx-auto">
        <div className="relative mb-6">
          {/* Decorative elements */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-70"></div>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-indigo-100 rounded-full opacity-70"></div>

          {/* 404 text */}
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-blue-500 relative z-10">
            404
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved to another
          URL.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block w-full px-5 py-3 text-gray-800 transition-colors border border-gray-800 rounded-lg hover:bg-indigo-50 font-medium"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FourOhFour;
