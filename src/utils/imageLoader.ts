import { getImageUrl } from './imageUtils';
import contentData from '../data/content';

/**
 * Load an image and return a promise that resolves when loaded or rejects on error
 */
function loadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    // Skip if already a data URL or empty
    if (!src || src.startsWith('data:')) {
      resolve();
      return;
    }

    const img = new Image();
    
    // Set timeout to prevent hanging forever
    const timeout = setTimeout(() => {
      console.warn(`Image load timeout: ${src}`);
      resolve(); // Resolve anyway to not block the app
    }, 8000); // 8 second timeout
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve();
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      console.warn(`Failed to load image: ${src}`);
      // Resolve anyway to not block the app, but log the error
      resolve();
    };
    
    img.src = src;
  });
}

/**
 * Get all critical images that need to load before showing the app
 */
export function getCriticalImages(): string[] {
  const images: string[] = [
    // Home page image
    getImageUrl("src/assets/ray.png"),
    // Logo
    getImageUrl("/assets/raylogo.png"),
    // Common story thumbnails (first few)
    getImageUrl("/assets/aishift.png"),
    getImageUrl("/assets/annapurna.png"),
    getImageUrl("/assets/yose.jpg"),
    // Profile image
    getImageUrl("src/assets/mitregan.png"),
  ];

  // Add first few story thumbnails from StoriesOfAdventure
  const storyThumbnails = contentData.storiesOfAdventure.stories
    .slice(0, 3)
    .map(story => {
      if (story.thumbnail) {
        return typeof story.thumbnail === 'string' 
          ? getImageUrl(story.thumbnail)
          : getImageUrl(story.thumbnail.url || '');
      }
      return null;
    })
    .filter((url): url is string => url !== null);

  images.push(...storyThumbnails);

  // Remove duplicates
  return Array.from(new Set(images.filter(Boolean)));
}

/**
 * Load all critical images and return a promise
 * Resolves when all images are loaded (or failed after timeout)
 */
export async function loadCriticalImages(): Promise<void> {
  const criticalImages = getCriticalImages();
  
  if (criticalImages.length === 0) {
    return Promise.resolve();
  }

  // Load all images with a timeout
  const loadPromises = criticalImages.map(src => 
    Promise.race([
      loadImage(src),
      new Promise<void>((resolve) => 
        setTimeout(() => {
          console.warn(`Image load timeout: ${src}`);
          resolve();
        }, 10000) // 10 second timeout per image
      )
    ])
  );

  await Promise.all(loadPromises);
}

/**
 * Check if images are still loading by checking their naturalWidth
 * This is a fallback check for images that might have loaded but not triggered events
 */
export function checkImagesLoaded(selector: string = 'img'): boolean {
  const images = document.querySelectorAll<HTMLImageElement>(selector);
  if (images.length === 0) return true;

  return Array.from(images).every(img => {
    // Image is loaded if it has naturalWidth > 0 OR if it's complete
    return img.complete && (img.naturalWidth > 0 || img.src.startsWith('data:'));
  });
}
