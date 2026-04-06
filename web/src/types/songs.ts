import { Artist } from "./artists";

export type Song = {
  id: number;
  title: string;
  album: string;
  genre: string;
  release_date: string;
  score: number;
  artist: number;
  artist_name?: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
};

export type SongPayload = {
  title: string;
  album: string;
  genre: string;
  release_date: string;
  artist: number;
};

export type SongStore = {
  songs: Song[];
  mySongs: Song[];
  topSongs: Song[];
  loading: boolean;
  error: string | null;
  getSongs: () => Promise<void>;
  getMySongs: () => Promise<void>;
  getTopSongs: () => Promise<void>;
  getSongById: (id: number) => Promise<Song | null>;
  createSong: (song: SongPayload) => Promise<void>;
  updateSong: (id: number, song: SongPayload) => Promise<void>;
  deleteSong: (id: number) => Promise<void>;
};
