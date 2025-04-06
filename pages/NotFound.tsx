import React from 'react';
import { Ghost, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-theme/10 rounded-xl flex items-center justify-center mx-auto mb-8">
          <Ghost className="w-12 h-12 text-theme" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-theme to-theme/60">
          404
        </h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-dark-2 hover:bg-dark-1 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <Link
            to="/"
            className="bg-gradient-to-r from-theme to-theme/80 hover:from-theme/90 hover:to-theme/70 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;