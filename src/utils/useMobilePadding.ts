import { useEffect, useRef } from 'react';

/**
 * Hook to apply padding-top using CSS variable to prevent fixed navigation from covering content
 * This uses the --nav-height CSS variable set by Navigation component for consistency
 */
export function useMobilePadding() {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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
      
      // Remove conflicting Tailwind classes
      el.classList.remove('pt-48', 'sm:pt-24', 'lg:pt-32');
      
      // Apply padding using CSS variable
      el.style.setProperty('padding-top', navHeight, 'important');
      
      // Verify no overlap
      requestAnimationFrame(() => {
        const navEl = document.querySelector('nav');
        if (navEl && el) {
          const navRect = navEl.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          const isOverlapping = elRect.top < navRect.bottom;
          
          // If still overlapping, add extra buffer
          if (isOverlapping) {
            const neededPadding = navRect.bottom - elRect.top + 20; // 20px buffer
            const currentPadding = parseFloat(navHeight) || 0;
            el.style.setProperty('padding-top', `${Math.max(currentPadding, neededPadding)}px`, 'important');
          }
        }
      });
    };
    
    // Apply immediately
    applyPadding();
    
    // Watch for CSS variable changes
    const observer = new MutationObserver(() => {
      applyPadding();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'data-nav-height']
    });
    
    // Also listen for resize/orientation changes
    window.addEventListener('resize', applyPadding);
    window.addEventListener('orientationchange', applyPadding);
    
    // Apply after delays to catch all render states
    const timeouts = [
      setTimeout(applyPadding, 0),
      setTimeout(applyPadding, 50),
      setTimeout(applyPadding, 100),
      setTimeout(applyPadding, 200),
      setTimeout(applyPadding, 500)
    ];
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', applyPadding);
      window.removeEventListener('orientationchange', applyPadding);
      timeouts.forEach(clearTimeout);
    };
  }, []);
  
  return contentRef;
}
