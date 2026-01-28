/**
 * Utility function to convert asset paths to URLs that work in both dev and production
 * Handles paths like "src/assets/image.png" and converts them to proper URLs
 * 
 * For Vite:
 * - Assets in src/assets/ need to be imported or placed in public/
 * - This function converts src/assets/ paths to /assets/ for public folder access
 * - Public assets in public/assets/ are preferred and used directly
 * - Full URLs and data URLs are returned as-is
 */
export function getImageUrl(path: string): string {
  // If it's already a full URL (http/https), return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If it's a data URL, return as is
  if (path.startsWith('data:')) {
    return path;
  }

  // If path already starts with /assets/, it's already a public asset path
  if (path.startsWith('/assets/')) {
    return path;
  }

  // Convert src/assets/ paths to /assets/ for Vite public folder access
  // This works in both dev and production builds
  if (path.startsWith('src/assets/')) {
    return path.replace('src/assets/', '/assets/');
  }

  // Convert public/assets/ paths to /assets/
  if (path.startsWith('public/assets/')) {
    return path.replace('public/assets/', '/assets/');
  }

  // If path already starts with /, return as is
  if (path.startsWith('/')) {
    return path;
  }

  // For other paths, assume they're in public/assets/ and add leading slash
  return `/assets/${path}`;
}

