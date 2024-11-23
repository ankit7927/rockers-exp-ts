export type ApiResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

export type SongPostData = {
  title: string;
  description: string;
  album: string;
  artists: string[];
  lyrics: string[];
  imageUrl: string;
  ytvId: string;
};

export type SongPutData = {
  title: string;
  description: string;
  album: string;
  artists: string[];
  lyrics: string[];
  imageUrl: string;
};

export type AlbumPutData = {
  name: string;
  description: string;
  imageUrl: string;
};

export type ArtistPutData = {
  name: string;
  description: string;
  imageUrl: string;
};
