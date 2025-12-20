import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  image: string;
  url?: string;
  type?: string;
}

export function useMetaTags({ title, description, image, url, type = 'article' }: MetaTagsProps) {
  useEffect(() => {
    // Get base URL
    const baseUrl = window.location.origin;
    // For HashRouter, convert hash URL to query parameter for better crawler support
    // e.g., /#/storiesofadventure/mustang-to-rockies -> /?route=/storiesofadventure/mustang-to-rockies
    let currentUrl = url || window.location.href;
    // Keep the hash URL as-is for now, but ensure it's absolute
    if (!currentUrl.startsWith('http')) {
      currentUrl = `${baseUrl}${currentUrl}`;
    }
    
    // Convert relative image URL to absolute - CRITICAL for social media crawlers
    let imageUrl = image;
    if (!image.startsWith('http')) {
      // Handle relative paths - ensure they're absolute
      if (image.startsWith('/')) {
        imageUrl = `${baseUrl}${image}`;
      } else if (image.startsWith('./') || image.startsWith('../')) {
        // Handle relative paths from current location
        imageUrl = `${baseUrl}/${image.replace(/^\.+\//, '')}`;
      } else {
        // Assume it's in assets folder
        imageUrl = `${baseUrl}/assets/${image}`;
      }
    }
    
    // Final check - ensure image URL is always absolute
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      imageUrl = `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    }

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update title
    document.title = title;

    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', imageUrl);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', type);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', false);
    updateMetaTag('twitter:title', title, false);
    updateMetaTag('twitter:description', description, false);
    updateMetaTag('twitter:image', imageUrl, false);

    // Standard meta tags
    updateMetaTag('description', description, false);

    // Cleanup function to restore default meta tags
    return () => {
      document.title = 'Regan Maharjan Portfolio Website';
      const defaultDescription = 'Computer scientist and Application Systems Analyst Senior bridging technology, education, and human-centered design';
      updateMetaTag('og:title', 'Regan Maharjan Portfolio Website');
      updateMetaTag('og:description', defaultDescription);
      updateMetaTag('og:image', `${baseUrl}/assets/raylogo.png`);
      updateMetaTag('og:url', baseUrl);
      updateMetaTag('og:type', 'website');
      updateMetaTag('twitter:card', 'summary_large_image', false);
      updateMetaTag('twitter:title', 'Regan Maharjan Portfolio Website', false);
      updateMetaTag('twitter:description', defaultDescription, false);
      updateMetaTag('twitter:image', `${baseUrl}/assets/raylogo.png`, false);
      updateMetaTag('description', defaultDescription, false);
    };
  }, [title, description, image, url, type]);
}

