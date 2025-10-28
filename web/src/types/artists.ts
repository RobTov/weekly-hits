export type Artist = {
  id: number;
  name: string;
  country: string;
  genre: string;
};

export type ArtisStore = {
  artists: Array<Artist>;
  getArtist: () => Promise<void>;
  createArtist: (value: Artist) => Promise<void>;
  updateArtist: (value: Artist) => Promise<void>;
  deleteArtist: (id: number) => Promise<void>;
};

export type StoreSet = (
  partial:
    | ArtisStore
    | Partial<ArtisStore>
    | ((state: ArtisStore) => ArtisStore | Partial<ArtisStore>),
  replace?: boolean | undefined
) => void;
