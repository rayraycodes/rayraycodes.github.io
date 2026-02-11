/**
 * Utility to preload images for better performance
 * Preloads critical images that are likely to be viewed soon
 */

import { getImageUrl } from './imageUtils';
import contentData from '../data/content';

/**
 * Preload critical images that appear on the homepage and common pages
 */
export function preloadCriticalImages() {
  const criticalImages: string[] = [
    // Home page image
    getImageUrl("src/assets/ray.png"),
    // Logo
    getImageUrl("/assets/raylogo.png"),
    // Common story thumbnails
    getImageUrl("/assets/aishift.png"),
    getImageUrl("/assets/annapurna.png"),
    getImageUrl("/assets/yose.jpg"),
    // Profile image
    getImageUrl("src/assets/mitregan.png"),
  ];

  criticalImages.forEach((imageUrl) => {
    if (imageUrl && !imageUrl.startsWith('http')) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageUrl;
      document.head.appendChild(link);
    } else if (imageUrl && imageUrl.startsWith('http')) {
      // For external images, use Image object to preload
      const img = new Image();
      img.src = imageUrl;
    }
  });
}

/**
 * Preload images for a specific story
 */
export function preloadStoryImages(storyId: string) {
  const allStories = [
    ...contentData.storiesOfAdventure.stories,
    ...contentData.impact.stories,
  ];
  
  const story = allStories.find((s) => s.id === storyId);
  if (!story || !story.content.images) return;

  story.content.images.forEach((image) => {
    const imageUrl = typeof image === 'string' ? image : image.url;
    const fullUrl = getImageUrl(imageUrl);
    
    if (fullUrl && !fullUrl.startsWith('http')) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = fullUrl;
      document.head.appendChild(link);
    } else if (fullUrl && fullUrl.startsWith('http')) {
      const img = new Image();
      img.src = fullUrl;
    }
  });
}

/**
 * Preload all photography images
 */
export function preloadPhotographyImages() {
  const images = contentData.photography.images;
  // Preload first 10 images (most likely to be viewed)
  images.slice(0, 10).forEach((img) => {
    const imageUrl = getImageUrl(img.url);
    if (imageUrl && !imageUrl.startsWith('http')) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageUrl;
      document.head.appendChild(link);
    } else if (imageUrl && imageUrl.startsWith('http')) {
      const imgElement = new Image();
      imgElement.src = imageUrl;
    }
  });
}
