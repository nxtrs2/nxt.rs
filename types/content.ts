// Base interface for common properties
export interface BaseContent {
  title: string;
  contentHtml: string;
  created?: string;
  updated?: string;
}

// Code content type
export interface CodeContent extends BaseContent {
  description?: string;
  image?: string;
  linkText?: string;
  link?: string;
  images?: string[];
}

// Music content type
export interface MusicContent extends BaseContent {
  isAlbum: boolean;
  description?: string;
  coverImage?: string;
  video?: string; // Path to video file (e.g., "example.mp4")
  isSoundcloud: boolean;
  songUrl: string;
  audioFile?: string; // Path to hosted audio file (e.g., "/music/track.mp3")
  tracks?: string[];
}

// Photo gallery content type
export interface PhotoGallery extends BaseContent {
  description?: string;
  heroImage?: string;

  images?: {
    url: string;
    caption?: string;
  }[];
}

// Words content type
export interface WordsContent extends BaseContent {
  heroImage?: string;
}

// Page content type
export interface PageContent extends BaseContent {
  // Pages might have additional properties in the future
}

// For listing content items
export interface ContentItem {
  id: string;
  [key: string]: any;
}
