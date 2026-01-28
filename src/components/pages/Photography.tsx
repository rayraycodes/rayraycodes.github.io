import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { X, Instagram } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import contentData from '../../data/content';

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
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  ${isSelected
                    ? 'bg-blue-600 text-white shadow-md border border-blue-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }
                `}
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
  const [isInView, setIsInView] = useState(index < 12); // Load first 12 eagerly
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (isInView || index < 12) return;

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
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView, index]);

  // Preload image when in view
  useEffect(() => {
    if (isInView && !isLoaded) {
      const img = new Image();
      img.src = photo.src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setIsLoaded(true); // Still mark as loaded to prevent retries
    }
  }, [isInView, photo.src, isLoaded]);

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
      className="group relative w-full h-full aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 focus-within:outline-none transition-all duration-500 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl"
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
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}
        
        {/* Actual image */}
        {isInView && (
        <img
            ref={imgRef}
          src={photo.src}
          alt={photo.alt}
            className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={index < 12 ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleImageLoad}
        />
        )}
        {/* Hover overlay with title - desktop only */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          {/* Vignette effect - darker bottom and edges */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.8) 100%), linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.2) 60%, transparent 100%)'
            }}
          />
          {/* Text container with additional dark background for better contrast */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/70 to-black/40">
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

function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">No photos found in this category.</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-gray-50/50 p-4 rounded-2xl"
      role="list"
      aria-label="Photo gallery"
      style={{ gap: '14px' }}
    >
      {photos.map((photo, index) => (
        <div key={photo.id} role="listitem" className="w-full aspect-square">
          <PhotoCard photo={photo} onOpen={onPhotoClick} index={index} />
        </div>
      ))}
    </div>
  );
}

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
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-45"
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
        className="fixed inset-0 z-50 flex items-center justify-center py-8 px-4 pointer-events-none space-x-7"
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] overflow-hidden flex flex-col pointer-events-auto space-x-7"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between px-8 py-10 border-b border-gray-200  p-4">
            <h2 id="photo-dialog-title" className="text-xl font-semibold text-gray-900 tracking-tight">
              {photo.title}
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-gray-600" aria-hidden="true" />
            </button>
          </div>

          {/* Image container */}
          <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-8">
            <img
              src={photo.src}
              alt={photo.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Footer with metadata */}
          <div className="px-8 py-8 border-t border-gray-200 bg-white overflow-y-auto flex-shrink-0">
            <div className="space-y-8">
              {/* Story Section */}
              {photo.story && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 tracking-tight">The Story</h3>
                  <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                    {photo.story}
                  </p>
                </div>
              )}

              {/* Description - only show if no story */}
              {photo.description && !photo.story && (
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed text-base">{photo.description}</p>
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-3 flex flex-wrap gap-6 text-sm text-muted-foreground pt-6 border-t border-gray-200">
                {photo.date && (
                  <div>
                    <span className="font-medium text-gray-900">Date:</span>{' '}
                    <span>{photo.date}</span>
                  </div>
                )}
                {photo.location && (
                  <div>
                    <span className="font-medium text-gray-900">Location:</span>{' '}
                    <span>{photo.location}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-900">Category:</span>{' '}
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

  // Preload critical images (first 4) for faster initial render
  useEffect(() => {
    const criticalImages = images.slice(0, 4);
    criticalImages.forEach((img: any) => {
      if (img.url) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.url;
        document.head.appendChild(link);
      }
    });

    return () => {
      // Cleanup preload links when component unmounts
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach((link) => {
        if (criticalImages.some((img: any) => img.url === link.getAttribute('href'))) {
          link.remove();
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
    <div className="min-h-screen bg-gray-50 pt-24 lg:pt-32">
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 lg:pt-16 pb-32 lg:pb-40">
        {/* Welcome Message */}
        <div className="mb-8 text-center">
          <p className="text-lg md:text-xl text-gray-700 mb-2">
            Hi there! 👋 Yes, I photograph things. Sometimes they turn out okay.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-4">
            Click on any photo to read the story behind it. Each one has a tale to tell or at least I think it does.
          </p>
          <p className="text-lg md:text-xl text-gray-500 italic">
            Why did the photographer get arrested? Because they were caught framing people! 📸
          </p>
        </div>

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

      {/* Connect CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl tracking-tight mb-6">
              Let's connect
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Love photography? Follow my work on Instagram or reach out to discuss collaborations and projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={contentData.assets.links.email}>
                <Button size="lg" className="rounded-full px-8">
                  Send an Email
                </Button>
              </a>
              <a href={contentData.assets.links.linkedin} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Connect on LinkedIn
                </Button>
              </a>
              <a href={contentData.assets.links.instagram} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  <Instagram className="w-5 h-5 mr-2" />
                  Follow on Instagram
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

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
