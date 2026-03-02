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
  getArtist: () => Promise<void>;
  createArtist: (value: Artist) => Promise<void>;
  updateArtist: (value: Artist) => Promise<void>;
  deleteArtist: (id: number) => Promise<void>;
};

export type StoreSet = (
  partial:
    | ArtistStore
    | Partial<ArtistStore>
    | ((state: ArtistStore) => ArtistStore | Partial<ArtistStore>),
  replace?: boolean | undefined,
) => void;
