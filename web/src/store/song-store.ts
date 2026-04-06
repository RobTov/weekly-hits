import { create } from 'zustand';
import { SongStore, Song, SongPayload } from '../types/songs';
import { get as apiGet, create as createApi, update, deletefn } from '../services/api';

const API_URL = 'http://127.0.0.1:8000/api';

export const useSongStore = create<SongStore>((set, get) => ({
  songs: [],
  mySongs: [],
  topSongs: [],
  loading: false,
  error: null,

  getSongs: async () => {
    set({ loading: true, error: null });
    try {
      const songs: Song[] = await apiGet(`${API_URL}/songs/`);
      set({ songs, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getMySongs: async () => {
    set({ loading: true, error: null });
    try {
      const songs: Song[] = await apiGet(`${API_URL}/songs/`);
      const userId = localStorage.getItem('user_id');
      const filtered = songs.filter(song => song.created_by === Number(userId));
      set({ mySongs: filtered, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getTopSongs: async () => {
    set({ loading: true, error: null });
    try {
      const songs: Song[] = await apiGet(`${API_URL}/top-songs/`);
      set({ topSongs: songs, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getSongById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const song: Song = await apiGet(`${API_URL}/songs/${id}/`);
      set({ loading: false });
      return song;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  createSong: async (song: SongPayload) => {
    set({ loading: true, error: null });
    try {
      await createApi(song, `${API_URL}/songs/`);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateSong: async (id: number, song: SongPayload) => {
    set({ loading: true, error: null });
    try {
      await update(song, `${API_URL}/songs/${id}/`);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteSong: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await deletefn(`${API_URL}/songs/${id}/`);
      set((state) => ({
        mySongs: state.mySongs.filter((song) => song.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));

