import React, { useState, useMemo, useEffect } from 'react';
import { Layout } from './Layout';
import { Photo, ViewMode } from './types';
import { samplePhotos } from './data';

export const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos);
  const [currentView, setCurrentView] = useState<ViewMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter photos based on current view and search
  const filteredPhotos = useMemo(() => {
    let filtered = [...photos];

    // Filter by view - using categories/albums
    switch (currentView) {
      case 'favorites':
        // Show photos from "Food" category (as Favorites category)
        filtered = filtered.filter(p => 
          p.category === 'Food' || p.albums.includes('Food')
        );
        break;
      case 'albums':
        // Show photos from "Events" category (as Albums category)
        filtered = filtered.filter(p => 
          p.category === 'Events' || p.albums.includes('Events')
        );
        break;
      case 'shared':
        // Show photos from "Abstract" category (as Shared category)
        filtered = filtered.filter(p => 
          p.category === 'Abstract' || p.albums.includes('Abstract')
        );
        break;
      case 'recents':
        // Show photos from "Nature" category (as Recents category), sorted by date
        filtered = filtered.filter(p => 
          p.category === 'Nature' || p.albums.includes('Nature')
        );
        filtered = filtered.sort((a, b) => 
          new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime()
        );
        break;
      case 'trash':
        // Show photos from "Urban" category (as Trash category)
        filtered = filtered.filter(p => 
          p.category === 'Urban' || p.albums.includes('Urban')
        );
        break;
      default:
        // 'all' - show all photos
        break;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(photo =>
        photo.title.toLowerCase().includes(query) ||
        photo.alt.toLowerCase().includes(query) ||
        photo.albums.some(album => album.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [photos, currentView, searchQuery]);

  // Handle photo click
  const handlePhotoClick = (photo: Photo | null) => {
    if (photo) {
      setSelectedPhoto(photo);
      const index = filteredPhotos.findIndex(p => p.id === photo.id);
      setLightboxIndex(index >= 0 ? index : 0);
    } else {
      setSelectedPhoto(null);
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (id: string) => {
    setPhotos(prevPhotos =>
      prevPhotos.map(photo =>
        photo.id === id ? { ...photo, favorite: !photo.favorite } : photo
      )
    );
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(prev => prev ? { ...prev, favorite: !prev.favorite } : null);
    }
    if (lightboxPhoto?.id === id) {
      setLightboxPhoto(prev => prev ? { ...prev, favorite: !prev.favorite } : null);
    }
  };

  // Handle photo selection
  const handlePhotoSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Handle select mode toggle
  const handleSelectModeToggle = () => {
    setIsSelectMode(prev => !prev);
    if (isSelectMode) {
      setSelectedIds(new Set());
    }
  };

  // Handle upload (mock)
  const handleUpload = () => {
    alert('Upload functionality would be implemented here');
  };

  // Handle lightbox
  const handleOpenLightbox = () => {
    if (selectedPhoto) {
      setLightboxPhoto(selectedPhoto);
      const index = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
      setLightboxIndex(index >= 0 ? index : 0);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxPhoto(null);
  };

  const handleLightboxNext = () => {
    if (lightboxIndex < filteredPhotos.length - 1) {
      const nextIndex = lightboxIndex + 1;
      setLightboxIndex(nextIndex);
      setLightboxPhoto(filteredPhotos[nextIndex]);
    } else {
      // Loop to beginning
      setLightboxIndex(0);
      setLightboxPhoto(filteredPhotos[0]);
    }
  };

  const handleLightboxPrevious = () => {
    if (lightboxIndex > 0) {
      const prevIndex = lightboxIndex - 1;
      setLightboxIndex(prevIndex);
      setLightboxPhoto(filteredPhotos[prevIndex]);
    } else {
      // Loop to end
      const lastIndex = filteredPhotos.length - 1;
      setLightboxIndex(lastIndex);
      setLightboxPhoto(filteredPhotos[lastIndex]);
    }
  };

  // Handle selection actions
  const handleAddToAlbum = () => {
    alert(`Add ${selectedIds.size} photos to album (mock)`);
  };

  const handleShare = () => {
    alert(`Share ${selectedIds.size} photos (mock)`);
  };

  const handleDelete = () => {
    if (confirm(`Delete ${selectedIds.size} photos?`)) {
      setPhotos(prevPhotos => prevPhotos.filter(p => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
      setIsSelectMode(false);
      if (selectedPhoto && selectedIds.has(selectedPhoto.id)) {
        setSelectedPhoto(null);
      }
    }
  };

  // Close detail panel when view changes
  useEffect(() => {
    setSelectedPhoto(null);
  }, [currentView]);

  // Close detail panel when entering select mode
  useEffect(() => {
    if (isSelectMode) {
      setSelectedPhoto(null);
    }
  }, [isSelectMode]);

  // Escape key to exit select mode or close lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxPhoto) {
          handleCloseLightbox();
        } else if (isSelectMode) {
          handleSelectModeToggle();
        } else if (selectedPhoto) {
          handlePhotoClick(null);
        }
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [lightboxPhoto, isSelectMode, selectedPhoto]);

  return (
    <Layout
      photos={photos}
      filteredPhotos={filteredPhotos}
      currentView={currentView}
      onViewChange={setCurrentView}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      selectedPhoto={selectedPhoto}
      onPhotoClick={handlePhotoClick}
      onPhotoSelect={handlePhotoSelect}
      selectedIds={selectedIds}
      isSelectMode={isSelectMode}
      onSelectModeToggle={handleSelectModeToggle}
      onFavoriteToggle={handleFavoriteToggle}
      onUpload={handleUpload}
      lightboxPhoto={lightboxPhoto}
      lightboxIndex={lightboxIndex}
      onOpenLightbox={handleOpenLightbox}
      onCloseLightbox={handleCloseLightbox}
      onLightboxNext={handleLightboxNext}
      onLightboxPrevious={handleLightboxPrevious}
      onAddToAlbum={handleAddToAlbum}
      onShare={handleShare}
      onDelete={handleDelete}
    />
  );
};

