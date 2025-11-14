// Photo gallery types
export interface Photo {
  id: string;
  src: string;
  alt: string;
  title: string;
  dateTaken: string;
  favorite: boolean;
  albums: string[];
  category?: string; // Main category for the photo
  size: number; // in bytes
  dimensions: {
    width: number;
    height: number;
  };
  location?: string;
}

export type ViewMode = 'all' | 'favorites' | 'albums' | 'shared' | 'recents' | 'trash';

export interface Album {
  id: string;
  name: string;
  photoCount: number;
}

