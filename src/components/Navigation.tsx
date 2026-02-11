import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Hand, BookOpen, FolderKanban, Camera, Home } from 'lucide-react';
import contentData from '../data/content';

interface NavigationProps {
  /** When true, render inline below content (e.g. on Home below Namaste) instead of fixed header */
  inline?: boolean;
}

export function Navigation({ inline = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const inlineNavContainerRef = useRef<HTMLElement>(null);
  const topNavContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Center the active tab with equal tabs on both sides when possible
  useEffect(() => {
    const container = inline ? inlineNavContainerRef.current : topNavContainerRef.current;
    if (!container) return;

    const activeIndex = contentData.navigation.links.findIndex(
      (link) => link.path === location.pathname
    );
    if (activeIndex === -1) return;

    const activeTab = tabRefs.current[activeIndex];
    if (!activeTab) return;

    // Wait for layout to settle and fonts to load
    setTimeout(() => {
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerCenter = containerWidth / 2;
      
      // Get the active tab's position relative to the container's scroll position
      const activeTabRect = activeTab.getBoundingClientRect();
      const activeTabLeftRelative = activeTabRect.left - containerRect.left;
      const activeTabWidth = activeTabRect.width;
      const activeTabCenterRelative = activeTabLeftRelative + activeTabWidth / 2;
      
      // Calculate how much we need to scroll to center the active tab
      const scrollOffset = activeTabCenterRelative - containerCenter;
      const newScrollLeft = container.scrollLeft + scrollOffset;
      
      // Ensure we don't scroll past the boundaries
      const maxScroll = container.scrollWidth - containerWidth;
      const clampedScroll = Math.max(0, Math.min(newScrollLeft, maxScroll));
      
      container.scrollTo({
        left: clampedScroll,
        behavior: 'smooth'
      });
    }, 150);
  }, [location.pathname, inline]);

  const navLinks = inline ? (contentData.navigation.homeLinks || contentData.navigation.links) : contentData.navigation.links;

  // Icon mapping for navigation links
  const getIconForPath = (path: string) => {
    if (path === '/') return Home;
    if (path === '/about') return Hand;
    if (path === '/storiesofadventure') return BookOpen;
    if (path === '/projects') return FolderKanban;
    if (path === '/photography') return Camera;
    return null;
  };

  // Exact same header menu behaviour, rendered inline below content (e.g. below Namaste on Home)
  if (inline) {
    return (
      <nav
        ref={inlineNavContainerRef}
        className="flex flex-nowrap items-center justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto scroll-smooth pb-2 -mb-2 w-full"
        aria-label="Main navigation"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {navLinks.map((link: { path: string; label: string }, index: number) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              ref={(el) => { tabRefs.current[index] = el; }}
              to={link.path}
              className="relative px-3 sm:px-5 md:px-6 py-2.5 sm:py-3 transition-colors group rounded-lg flex-shrink-0 text-center whitespace-nowrap min-h-[44px] flex items-center justify-center"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabInline"
                  className="absolute inset-0 bg-gray-200 rounded-lg border-2 border-gray-300 shadow-sm"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span
                className={`relative z-10 font-medium transition-all ${
                  isActive
                    ? 'text-gray-900 font-semibold opacity-100 text-lg sm:text-xl'
                    : 'text-gray-600 opacity-50 group-hover:text-gray-900 group-hover:opacity-100 text-sm sm:text-base'
                }`}
              >
                {link.label}
              </span>
              {!isActive && (
                <div className="absolute inset-0 bg-black/[0.02] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white border-b border-black/10 shadow-lg' 
          : 'bg-white/90 backdrop-blur-sm shadow-md'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="max-w-[100rem] w-full mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-1" aria-hidden="true" />

          {/* Desktop Navigation - centered, wider hit areas */}
          <div 
            ref={topNavContainerRef}
            className="hidden lg:flex items-center justify-center gap-2 xl:gap-4 flex-1 flex-nowrap overflow-x-auto scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {navLinks.map((link: { path: string; label: string }, index: number) => {
              const isActive = location.pathname === link.path;
              const IconComponent = getIconForPath(link.path);
              return (
                <Link
                  key={link.path}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  to={link.path}
                  className="relative px-3 xl:px-6 py-3 transition-colors group rounded-lg flex-shrink-0 text-center whitespace-nowrap flex items-center justify-center gap-1.5"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gray-200 rounded-lg border-2 border-gray-300 shadow-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  {IconComponent && (
                    <IconComponent className={`relative z-10 w-4 h-4 transition-all ${
                      isActive
                        ? 'text-gray-900 opacity-100'
                        : 'text-gray-600 opacity-50 group-hover:text-gray-900 group-hover:opacity-100'
                    }`} />
                  )}
                  <span
                    className={`relative z-10 font-medium transition-all ${
                      isActive
                        ? 'text-gray-900 font-semibold opacity-100 text-xl'
                        : 'text-gray-600 opacity-50 group-hover:text-gray-900 group-hover:opacity-100 text-base'
                    }`}
                  >
                    {link.label}
                  </span>
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/[0.02] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button - touch-friendly (min 44px) */}
          <div className="flex-1 flex justify-end lg:justify-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-black/5 active:bg-black/10 transition-colors touch-manipulation"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - full-width, touch-friendly links */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 py-4 sm:py-5 space-y-2 text-center">
            {navLinks.map((link: { path: string; label: string }) => {
              const isActive = location.pathname === link.path;
              const IconComponent = getIconForPath(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full py-4 px-6 rounded-xl transition-colors touch-manipulation min-h-[48px] flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-gray-100/90 border border-gray-200/60 font-semibold text-gray-900 text-xl sm:text-2xl'
                      : 'font-medium text-gray-600 opacity-50 active:opacity-100 active:bg-black/5 hover:opacity-100 hover:bg-black/[0.02] hover:text-gray-900 text-base sm:text-lg'
                  }`}
                >
                  {IconComponent && (
                    <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      isActive
                        ? 'text-gray-900'
                        : 'text-gray-600 opacity-50'
                    }`} />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}