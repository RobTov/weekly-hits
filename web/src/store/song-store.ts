import { create } from "zustand";
import { Song, SongStore } from "../types/songs";
import { create as createFn, get, update, deletefn } from "../services/api";

export const useSongStore = create<SongStore>()((set) => ({
  songs: [],
  getSong: async () => {
    const songs = await get("songs/");
    return set((state) => ({ ...state, songs }));
  },
  createSong: async (newSong: Song) => {
    const song = await createFn(
      newSong,
      "songs/",
    );
    return set((state) => ({
      ...state,
      songs: [...state.songs, newSong],
    }));
  },
  updateSong: async (updatedSong: Song) => {
    const song = await update(updatedSong, `songs/${updatedSong.id}/`);
    return set((state) => ({
      ...state,
      songs: state.songs.map((a) => (a.id === song.id ? song : a)),
    }));
  },
  deleteSong: async (id: number) => {
    await deletefn(`songs/${id}/`);
    return set((state) => ({
      ...state,
      songs: state.songs.filter((song) => id === song.id),
    }));
  },
}));
