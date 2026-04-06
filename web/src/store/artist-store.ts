import { create } from "zustand";
import { Artist, ArtistStore } from "../types/artists";
import { create as createFn, get, update, deletefn } from "../services/api";

export const useArtistStore = create<ArtistStore>()((set) => ({
  artists: [],
  loading: false,
  error: null,
  getArtist: async () => {
    set({ loading: true, error: null });
    try {
      const artists: Artist[] = await get("artists/");
      set({ artists, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  createArtist: async (newArtist: Artist) => {
    set({ loading: true, error: null });
    try {
      const artist = await createFn(newArtist, "artists/");
      set((state) => ({
        ...state,
        artists: [...state.artists, artist],
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  updateArtist: async (updatedArtist: Artist) => {
    set({ loading: true, error: null });
    try {
      const artist = await update(updatedArtist, `artists/${updatedArtist.id}/`);
      set((state) => ({
        ...state,
        artists: state.artists.map((a) => (a.id === artist.id ? artist : a)),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  deleteArtist: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await deletefn(`artists/${id}/`);
      set((state) => ({
        ...state,
        artists: state.artists.filter((artist) => id !== artist.id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
