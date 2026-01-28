import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUtils';

/**
 * Footer Component
 *
 * Footer with logo/icon, and design inspiration message.
 */
export function Footer() {
  return (
    <footer className="mt-auto mt-20 bg-gray-50 py-12 mb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link to="/" className="flex items-center" aria-label="Home">
            <img
              src={getImageUrl("src/assets/raylogo.png")}
              alt="Regan Maharjan logo"
              className="h-16 w-auto transition-opacity hover:opacity-80"
            />
          </Link>
          <p className="text-sm text-gray-500 italic">
            If you are inspired with this design do copy, let me know at{' '}
            <a 
              href="mailto:imregan@umich.edu" 
              className="text-gray-600 hover:text-gray-900 underline transition-colors"
            >
              imregan@umich.edu
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

