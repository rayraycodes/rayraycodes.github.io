import React, { useRef, useEffect } from 'react';
import { Photo } from './types';
import { PhotoCard } from './PhotoCard';

interface PhotoGridProps {
  photos: Photo[];
  selectedIds: Set<string>;
  isSelectMode: boolean;
  onPhotoClick: (photo: Photo) => void;
  onPhotoSelect: (id: string) => void;
  onFavoriteToggle: (id: string) => void;
  onInfoClick: (photo: Photo) => void;
  focusedPhotoId?: string;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  selectedIds,
  isSelectMode,
  onPhotoClick,
  onPhotoSelect,
  onFavoriteToggle,
  onInfoClick,
  focusedPhotoId
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const focusedRef = useRef<HTMLDivElement>(null);

  // Scroll focused photo into view
  useEffect(() => {
    if (focusedPhotoId && focusedRef.current) {
      focusedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
      focusedRef.current.focus();
    }
  }, [focusedPhotoId]);

  // Calculate grid columns based on viewport width
  const getGridCols = () => {
    if (typeof window === 'undefined') return 'grid-cols-2';
    const width = window.innerWidth;
    if (width < 640) return 'grid-cols-2';
    if (width < 768) return 'grid-cols-3';
    if (width < 1024) return 'grid-cols-4';
    if (width < 1280) return 'grid-cols-5';
    return 'grid-cols-6';
  };

  // Keyboard navigation
  useEffect(() => {
    if (!gridRef.current || isSelectMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || 
          e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const focused = document.activeElement as HTMLElement;
        if (!focused || !gridRef.current?.contains(focused)) return;

        const cards = Array.from(
          gridRef.current.querySelectorAll('[role="button"]')
        ) as HTMLElement[];

        const currentIndex = cards.indexOf(focused);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;
        const cols = window.innerWidth < 640 ? 2 : 
                     window.innerWidth < 768 ? 3 :
                     window.innerWidth < 1024 ? 4 :
                     window.innerWidth < 1280 ? 5 : 6;

        if (e.key === 'ArrowRight') {
          nextIndex = Math.min(currentIndex + 1, cards.length - 1);
        } else if (e.key === 'ArrowLeft') {
          nextIndex = Math.max(currentIndex - 1, 0);
        } else if (e.key === 'ArrowDown') {
          nextIndex = Math.min(currentIndex + cols, cards.length - 1);
        } else if (e.key === 'ArrowUp') {
          nextIndex = Math.max(currentIndex - cols, 0);
        }

        if (nextIndex !== currentIndex) {
          e.preventDefault();
          cards[nextIndex]?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSelectMode]);

  if (photos.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No photos found</p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className={`grid ${getGridCols()} gap-2 p-4 pt-12`}
      role="grid"
      aria-label="Photo gallery"
    >
      {photos.map((photo) => (
        <div
          key={photo.id}
          ref={focusedPhotoId === photo.id ? focusedRef : null}
        >
          <PhotoCard
            photo={photo}
            isSelected={selectedIds.has(photo.id)}
            isSelectMode={isSelectMode}
            onSelect={onPhotoSelect}
            onClick={onPhotoClick}
            onFavoriteToggle={onFavoriteToggle}
            onInfoClick={onInfoClick}
          />
        </div>
      ))}
    </div>
  );
};

