import { create } from "zustand";
import { Artist, ArtistStore } from "../types/artists";
import { create as createFn, get, update, deletefn } from "../services/api";

export const useArtistStore = create<ArtistStore>()((set) => ({
  artists: [],
  getArtist: async () => {
    const artists = await get("artists/");
    return set((state) => ({ ...state, artists }));
  },
  createArtist: async (newArtist: Artist) => {
    // {
    //   name: newArtist.name,
    //   genre: newArtist.genre,
    //   country: newArtist.country,
    // } ,
    const artist = await createFn(
      newArtist,
      "artists/",
    );
    return set((state) => ({
      ...state,
      artists: [...state.artists, newArtist],
    }));
  },
  updateArtist: async (updatedArtist: Artist) => {
    const artist = await update(updatedArtist, `artists/${updatedArtist.id}/`);
    return set((state) => ({
      ...state,
      artists: state.artists.map((a) => (a.id === artist.id ? artist : a)),
    }));
  },
  deleteArtist: async (id: number) => {
    await deletefn(`artists/${id}/`);
    return set((state) => ({
      ...state,
      artists: state.artists.filter((artist) => id === artist.id),
    }));
  },
}));
