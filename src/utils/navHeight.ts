/**
 * Utility to ensure navigation height is calculated and applied correctly
 * This runs immediately on page load to prevent content overlap
 */

export function initializeNavHeight() {
  // Set aggressive fallback immediately
  const setFallback = () => {
    const isMobile = window.innerWidth < 640;
    
    // For mobile, ALWAYS use 200px minimum to ensure content never overlaps
    // This accounts for: safe-area (up to 50px) + nav (64px) + buffer (86px)
    const fallbackHeight = isMobile ? 200 : 96;
    
    document.documentElement.style.setProperty('--nav-height', `${fallbackHeight}px`);
    document.documentElement.setAttribute('data-nav-height', `${fallbackHeight}`);
  };
  
  // Set immediately - don't wait for anything
  setFallback();
  
  // Set on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setFallback);
  }
  
  // Set on load
  window.addEventListener('load', setFallback);
  
  // Set on resize/orientation change
  window.addEventListener('resize', setFallback);
  window.addEventListener('orientationchange', setFallback);
}

// Initialize immediately when this module loads
if (typeof window !== 'undefined') {
  initializeNavHeight();
}
