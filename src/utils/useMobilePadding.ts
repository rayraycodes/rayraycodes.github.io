import { useEffect, useRef } from 'react';

/**
 * Hook to apply padding-top using CSS variable to prevent fixed navigation from covering content
 * This uses the --nav-height CSS variable set by Navigation component for consistency
 */
export function useMobilePadding() {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    const applyPadding = () => {
      if (!contentRef.current) return;
      
      const el = contentRef.current;
      
      // Get nav height from CSS variable (set by Navigation component)
      const navHeight = getComputedStyle(document.documentElement).getPropertyValue('--nav-height').trim();
      
      if (!navHeight) {
        // Fallback if CSS variable not set yet
        const isMobile = window.innerWidth < 640;
        const fallbackHeight = isMobile ? '200px' : '96px';
        el.style.setProperty('padding-top', fallbackHeight, 'important');
        return;
      }
      
      // Remove conflicting Tailwind classes that add padding-top
      el.classList.remove('pt-48', 'sm:pt-24', 'lg:pt-32', 'pt-4', 'sm:pt-16', 'lg:pt-24', 'pt-8', 'pt-12', 'pt-16', 'pt-20');
      
      // Apply padding using CSS variable
      el.style.setProperty('padding-top', navHeight, 'important');
      
      // Removed dynamic overlap checking during scroll to prevent layout shifts
      // Padding is set once based on nav height and doesn't change during scroll
    };
    
    // Debounced version for observers and events
    const debouncedApplyPadding = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        applyPadding();
        timeoutId = null;
      }, 50);
    };
    
    // Apply immediately
    applyPadding();
    
    // Watch for CSS variable changes with debouncing
    const observer = new MutationObserver(() => {
      debouncedApplyPadding();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'data-nav-height']
    });
    
    // Also listen for resize/orientation changes (debounced)
    window.addEventListener('resize', debouncedApplyPadding, { passive: true });
    window.addEventListener('orientationchange', debouncedApplyPadding);
    
    // Single delayed check after initial render
    const initialTimeout = setTimeout(applyPadding, 100);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', debouncedApplyPadding);
      window.removeEventListener('orientationchange', debouncedApplyPadding);
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, []);
  
  return contentRef;
}
