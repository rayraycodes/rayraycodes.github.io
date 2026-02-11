import { useState, useEffect } from 'react';
import { loadCriticalImages } from '../utils/imageLoader';

/**
 * Hook to track image loading state
 * Returns true while images are loading, false when done
 */
export function useImageLoading(): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadImages = async () => {
      try {
        // Load critical images
        await loadCriticalImages();
        
        // Small delay to ensure smooth transition
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (mounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading images:', error);
        // Even if there's an error, hide loading screen after a delay
        if (mounted) {
          setTimeout(() => setIsLoading(false), 1000);
        }
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, []);

  return isLoading;
}
