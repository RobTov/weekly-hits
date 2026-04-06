import { create } from 'zustand';
import { UserStore, User, RegisterPayload } from '../types/auth';
import { get, create as createApi, update, deletefn } from '../services/api';

const API_URL = 'http://127.0.0.1:8000/api';

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,

  getUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users: User[] = await get(`${API_URL}/users/`);
      set({ users, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  getUserById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const user: User = await get(`${API_URL}/users/${id}/`);
      set({ loading: false });
      return user;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  createUser: async (data: RegisterPayload) => {
    set({ loading: true, error: null });
    try {
      await createApi(data, `${API_URL}/auth/register/`);
      const users: User[] = await get(`${API_URL}/users/`);
      set({ users, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateUser: async (id: number, data: Partial<User>) => {
    set({ loading: true, error: null });
    try {
      await update(data, `${API_URL}/users/${id}/`);
      const users: User[] = await get(`${API_URL}/users/`);
      set({ users, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteUser: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await deletefn(`${API_URL}/users/${id}/`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
