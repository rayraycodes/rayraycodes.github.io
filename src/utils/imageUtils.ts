/**
 * Base URL for assets (e.g. '' for dev, '/rayraycodes.github.io' for GitHub Pages project site).
 * Vite sets import.meta.env.BASE_URL - use it so assets load on live.
 */
const BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL
  ? import.meta.env.BASE_URL.replace(/\/$/, '') // strip trailing slash
  : '';

/**
 * Utility function to convert asset paths to URLs that work in both dev and production.
 * Handles paths like "src/assets/image.png" and converts them to proper URLs.
 * Uses BASE_URL so images load on GitHub Pages and other hosted environments.
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

  // Normalize to a path that starts with /
  let normalized = path;
  if (path.startsWith('/assets/')) {
    normalized = path;
  } else if (path.startsWith('src/assets/')) {
    normalized = path.replace('src/assets/', '/assets/');
  } else if (path.startsWith('public/assets/')) {
    normalized = path.replace('public/assets/', '/assets/');
  } else if (path.startsWith('/')) {
    normalized = path;
  } else {
    normalized = `/assets/${path}`;
  }

  // Prepend base URL so assets load on live (e.g. GitHub Pages)
  return BASE_URL + normalized;
}

