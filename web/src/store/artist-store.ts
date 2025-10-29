import { create } from "zustand";
import { Artist, ArtistStore } from "../types/artists";
import { create as createFn, get, update, deletefn } from "../services/api";

export const useArtistStore = create<ArtistStore>()((set) => ({
  artists: [],
  getArtist: async () => {
    const artists = await get("artist");
    return set((state) => ({ ...state, artists }));
  },
  createArtist: async (newArtist: Artist) => {
    const artist = await createFn(newArtist, "artist");
    return set((state) => ({
      ...state,
      artists: [...state.artists, artist],
    }));
  },
  updateArtist: async (updatedArtist: Artist) => {
    const artist = await update(updatedArtist, "artist");
    return set((state) => ({
      ...state,
      artists: state.artists.map((a) => (a.id === artist.id ? artist : a)),
    }));
  },
  deleteArtist: async (id: number) => {
    await deletefn(id, "artist");
    return set((state) => ({
      ...state,
      artists: state.artists.filter((artist) => id === artist.id),
    }));
  },
}));
