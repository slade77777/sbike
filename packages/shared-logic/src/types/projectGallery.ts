export enum GalleryKind {
  MAIN = 'main',
  OVERVIEW = 'overview',
  PROGRESS = 'progress',
  INSIDE_FACILITY = 'facilities',
  LOCATION = 'location',
}

export interface ProjectGallery {
  collection: GalleryKind;
  hero_url: string;
}
