import { Artist } from "./artists";

export type Song = {
  id: number;
  title: string;
  album: string;
  genre: string;
  releseDate: string;
  score: number;
  artist: Artist
};

export type SongStore = {
  songs: Array<Song>;
  getSong: () => Promise<void>;
  createSong: (value: Song) => Promise<void>;
  updateSong: (value: Song) => Promise<void>;
  deleteSong: (id: number) => Promise<void>;
};

export type StoreSet = (
  partial:
    | SongStore
    | Partial<SongStore>
    | ((state: SongStore) => SongStore | Partial<SongStore>),
  replace?: boolean | undefined,
) => void;
