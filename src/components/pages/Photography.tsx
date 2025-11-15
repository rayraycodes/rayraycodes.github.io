import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { X } from 'lucide-react';
import contentData from '../../data/content';
import { brandColors } from '../../styles/brandColors';
import { getPageTitleColor } from '../../utils/brandColorsConfig';

// Photo type definition
// Note: category can be a string (single category) or string[] (multiple categories)
interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string | string[];
  date: string;
  location?: string;
  description?: string;
  story?: string;
}

// Category Filter Bar Component
interface CategoryFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryFilterBar({ categories, selectedCategory, onCategoryChange }: CategoryFilterBarProps) {
  return (
    <nav aria-label="Photo categories" className="mb-8">
      <ul className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide" role="list">
        {categories.map((category) => {
          const isSelected = category === selectedCategory;
          return (
            <li key={category} role="listitem">
              <button
                type="button"
                onClick={() => onCategoryChange(category)}
                aria-pressed={isSelected}
                aria-current={isSelected ? 'page' : undefined}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md border"
                style={{
                  backgroundColor: isSelected ? brandColors.blue : 'white',
                  color: isSelected ? 'white' : brandColors.blue,
                  borderColor: isSelected ? brandColors.blue : brandColors.white,
                  boxShadow: isSelected ? `0 2px 4px ${brandColors.blue}40` : `0 1px 2px ${brandColors.white}60`,
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = `${brandColors.white}30`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// Photo Card Component
interface PhotoCardProps {
  photo: Photo;
  onOpen: (photo: Photo) => void;
  index: number;
}

const PhotoCard = memo(function PhotoCard({ photo, onOpen, index }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(index < 6); // Load first 6 eagerly (reduced from 12)
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Intersection Observer for lazy loading - optimized
  useEffect(() => {
    if (isInView || index < 6) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Increased to start loading earlier
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView, index]);

  // Preload image when in view - optimized
  useEffect(() => {
    if (isInView && !isLoaded && photo.src) {
      // Use requestIdleCallback for non-critical images
      const loadImage = () => {
        const img = new Image();
        img.src = photo.src;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsLoaded(true);
      };
      
      if (index < 6) {
        // Critical images load immediately
        loadImage();
      } else if ('requestIdleCallback' in window) {
        // Non-critical images load when browser is idle
        requestIdleCallback(loadImage, { timeout: 2000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(loadImage, 100);
      }
    }
  }, [isInView, photo.src, isLoaded, index]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(photo);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <article 
      ref={containerRef}
      className="group relative w-full h-full aspect-square overflow-hidden rounded-lg cursor-pointer focus-within:ring-2 focus-within:ring-offset-1 focus-within:outline-none"
      style={{ 
        backgroundColor: `${brandColors.white}40`,
        willChange: 'transform', // Optimize for animations
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = `2px solid ${brandColors.blue}`;
        e.currentTarget.style.outlineOffset = '2px';
      }}
    >
      <button
        type="button"
        onClick={() => onOpen(photo)}
        onKeyDown={handleKeyDown}
        className="w-full h-full focus:outline-none"
        aria-label={`View ${photo.title}`}
      >
        {/* Blur placeholder */}
        {!isLoaded && (
          <div 
            className="absolute inset-0 bg-gradient-to-br animate-pulse" 
            style={{
              background: `linear-gradient(to bottom right, ${brandColors.white}60, ${brandColors.white}80, ${brandColors.white}60)`
            }}
          />
        )}
        
        {/* Actual image */}
        {isInView && (
        <img
            ref={imgRef}
          src={photo.src}
          alt={photo.alt}
            className={`w-full h-full object-cover ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              willChange: 'opacity, transform',
              transition: isLoaded ? 'opacity 0.3s ease-out' : 'none',
            }}
            loading={index < 6 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleImageLoad}
        />
        )}
        {/* Hover overlay with title - desktop only */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ willChange: 'opacity' }}>
          {/* Vignette effect - darker bottom and edges */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.8) 100%), linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)'
            }}
          />
          {/* Text container with additional dark background for better contrast */}
          <div 
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t"
            style={{
              background: `linear-gradient(to top, ${brandColors.blue}E6, ${brandColors.blue}B3, ${brandColors.blue}66)`
            }}
          >
            <h3 className="text-white text-sm font-medium truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{photo.title}</h3>
          </div>
        </div>
      </button>
    </article>
  );
});

// Photo Grid Component
interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

const PhotoGrid = memo(function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <p style={{ color: brandColors.blue }}>No photos found in this category.</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4 rounded-2xl"
      style={{ backgroundColor: `${brandColors.white}30`, gap: '14px' }}
      role="list"
      aria-label="Photo gallery"
    >
      {photos.map((photo, index) => (
        <div key={photo.id} role="listitem" className="w-full aspect-square">
          <PhotoCard photo={photo} onOpen={onPhotoClick} index={index} />
        </div>
      ))}
    </div>
  );
});

// Photo Detail Dialog Component
interface PhotoDetailDialogProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}


function PhotoDetailDialog({ photo, isOpen, onClose }: PhotoDetailDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const [imageOrientation, setImageOrientation] = useState<'portrait' | 'landscape' | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [dialogWidth, setDialogWidth] = useState<string>('90vw');

  // Set responsive dialog width - debounced for performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const updateWidth = () => {
      if (window.innerWidth >= 1024) {
        setDialogWidth('60vw');
      } else if (window.innerWidth >= 640) {
        setDialogWidth('85vw');
      } else {
        setDialogWidth('90vw');
      }
    };
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateWidth, 150); // Debounce resize
    };
    
    updateWidth();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Detect image orientation when photo changes - optimized
  useEffect(() => {
    if (photo && photo.src) {
      // Use the image that's already in the dialog if available
      if (imgRef.current && imgRef.current.complete) {
        const isPortrait = imgRef.current.naturalHeight > imgRef.current.naturalWidth;
        setImageOrientation(isPortrait ? 'portrait' : 'landscape');
      } else {
        // Only create new image if needed
        const img = new Image();
        img.onload = () => {
          const isPortrait = img.height > img.width;
          setImageOrientation(isPortrait ? 'portrait' : 'landscape');
        };
        img.onerror = () => {
          setImageOrientation('landscape');
        };
        img.src = photo.src;
      }
    } else {
      setImageOrientation(null);
    }
  }, [photo]);

  // Focus management and keyboard handling
  useEffect(() => {
    if (isOpen && photo) {
      // Store the element that had focus before opening
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      
      // Focus the close button when dialog opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);

      // Handle Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      // Trap focus within dialog
      const handleTab = (e: KeyboardEvent) => {
        if (!dialogRef.current) return;

        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTab);

      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleTab);
        document.body.style.overflow = '';
        
        // Return focus to the element that opened the dialog
        previousActiveElementRef.current?.focus();
      };
    }
  }, [isOpen, photo, onClose]);

  if (!isOpen || !photo) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 backdrop-blur-sm z-45"
        style={{ backgroundColor: `${brandColors.blue}4D` }}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-dialog-title"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none"
      >
        <div
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto h-[85vh] sm:h-[80vh] lg:h-[80vh]"
          style={{
            width: dialogWidth,
            maxWidth: dialogWidth,
            maxHeight: '90vh'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with close button - sticky at top */}
          <div 
            className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b bg-white flex-shrink-0 sticky top-0 z-10"
            style={{ borderBottomColor: `${brandColors.white}60` }}
          >
            <h2 id="photo-dialog-title" className="text-base sm:text-lg font-semibold tracking-tight pr-4 truncate" style={{ color: brandColors.blue }}>
              {photo.title}
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors flex-shrink-0"
              style={{
                color: brandColors.blue,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${brandColors.white}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid ${brandColors.blue}`;
                e.currentTarget.style.outlineOffset = '2px';
              }}
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Image container - scrollable, adapts to orientation, can shrink if needed */}
          <div 
            className="flex-1 overflow-auto flex items-center justify-center min-h-0"
            style={{ backgroundColor: `${brandColors.white}30`, padding: '5%', flexShrink: 1, minHeight: 0 }}>
            <img
              ref={imgRef}
              src={photo.src}
              alt={photo.alt}
              className="object-contain rounded-lg"
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Footer with metadata - scrollable */}
          <div 
            className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-white overflow-y-auto flex-shrink-0"
            style={{ borderTopColor: `${brandColors.white}60` }}
          >
            <div className="space-y-4 sm:space-y-6">
              {/* Story Section */}
              {photo.story && (
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight" style={{ color: brandColors.blue }}>The Story</h3>
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line" style={{ color: brandColors.blue }}>
                    {photo.story}
                  </p>
                </div>
              )}

              {/* Description - only show if no story */}
              {photo.description && !photo.story && (
                <div className="space-y-3">
                  <p className="leading-relaxed text-base" style={{ color: brandColors.blue }}>{photo.description}</p>
                </div>
              )}

              {/* Metadata */}
              <div 
                className="space-y-2 sm:space-y-3 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm pt-4 sm:pt-6 border-t"
                style={{ 
                  borderTopColor: `${brandColors.white}60`
                }}
              >
                {photo.date && (
                  <div style={{ color: brandColors.blue }}>
                    <span className="font-medium">Date:</span>{' '}
                    <span>{photo.date}</span>
                  </div>
                )}
                {photo.location && (
                  <div style={{ color: brandColors.blue }}>
                    <span className="font-medium">Location:</span>{' '}
                    <span>{photo.location}</span>
                  </div>
                )}
                <div style={{ color: brandColors.blue }}>
                  <span className="font-medium">Category:</span>{' '}
                  <span>
                    {Array.isArray(photo.category)
                      ? photo.category.join(', ')
                      : photo.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Main Photo Gallery Component
export function Photography() {
  // Check for CMS data in localStorage first, fallback to content.ts
  const [cmsData, setCmsData] = useState<any>(null);
  
  useEffect(() => {
    const saved = localStorage.getItem('cms-photography-data');
    if (saved) {
      try {
        setCmsData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load CMS data');
      }
    }
  }, []);

  const photographyData = cmsData || contentData.photography;
  const { categories, images } = photographyData;

  // Preload critical images (first 6) for faster initial render - optimized
  useEffect(() => {
    const criticalImages = images.slice(0, 6);
    const preloadLinks: HTMLLinkElement[] = [];
    
    criticalImages.forEach((img: any) => {
      if (img.url) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.url;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
        preloadLinks.push(link);
      }
    });

    return () => {
      // Cleanup preload links when component unmounts
      preloadLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [images]);
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Transform images data to Photo format - memoized to prevent recalculation
  const photos: Photo[] = useMemo(() => {
    return images.map((img: any) => ({
    id: img.id,
    src: img.url,
    alt: img.title,
    title: img.title,
    category: img.category,
    date: img.date || '2024',
    location: img.location,
    description: img.description,
    story: img.story || img.description, // Use story from content.ts, fallback to description
  }));
  }, [images]);

  // Filter photos based on selected category - memoized for performance
  // Supports both single category (string) and multiple categories (string[])
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') {
      return photos;
    }
    return photos.filter((photo) => {
          const photoCategories = Array.isArray(photo.category)
            ? photo.category
            : [photo.category];
          return photoCategories.includes(selectedCategory);
        });
  }, [photos, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Announce category change to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Showing ${category === 'All' ? 'all' : category} photos`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Small delay to allow focus return animation
    setTimeout(() => {
      setSelectedPhoto(null);
    }, 200);
  };

  return (
    <div 
      className="min-h-screen pt-24 lg:pt-32"
      style={{ backgroundColor: `${brandColors.white}20` }}
    >
      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-12 lg:pt-16 pb-32 lg:pb-40">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-semibold mb-3 tracking-tight" style={{ color: getPageTitleColor('photography') }}>
            Portfolio
          </h1>
        </header>

        {/* Category Filters */}
        <CategoryFilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Photo Grid */}
        <PhotoGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />

        {/* Photo Detail Dialog */}
        <PhotoDetailDialog
          photo={selectedPhoto}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      </main>

      {/* Screen reader only class for announcements */}
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        /* Enhanced focus styles for better accessibility */
        button:focus-visible,
        article:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
