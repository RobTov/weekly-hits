export type Artist = {
  id: number;
  name: string;
  country: string;
  genre: string;
};

export type ArtistPayload = {
  name: string;
  country: string;
  genre: string;
};

export type ArtistStore = {
  artists: Array<Artist>;
  loading: boolean;
  error: string | null;
  getArtist: () => Promise<void>;
  createArtist: (value: Artist) => Promise<void>;
  updateArtist: (value: Artist) => Promise<void>;
  deleteArtist: (id: number) => Promise<void>;
};
