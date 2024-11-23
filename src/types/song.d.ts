import { Types } from "mongoose";

interface Song {
  _id: Types.ObjectId;
  title: string;
  description: string;
  album: Album;
  artists: Artist[];
  lyrics: string[];
  imageUrl: string;
  ytvId: string;
}

interface Album {
  _id: Types.ObjectId;
  name: string;
  description: string;
  imageUrl: string;
}

interface Artist {
  _id: Types.ObjectId;
  name: string;
  art: string;
  imageUrl: string;
}

interface Collection {
  _id: Types.ObjectId;
  name: string;
  description: string;
  imageUrl: string;
  songs: Song[];
}
