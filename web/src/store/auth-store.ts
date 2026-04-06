import { create } from 'zustand';
import { AuthStore, LoginPayload, RegisterPayload, User, AuthResponse } from '../types/auth';
import { getAuth, refreshToken } from '../services/api';

const API_URL = 'http://127.0.0.1:8000/api';

const computeUserRoles = (user: User): User => ({
  ...user,
  is_administrator: user.role === 'administrator',
  is_musical_programmer: user.role === 'musical_programmer',
});

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (credentials: LoginPayload) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error de autenticación');
      }
      const data: AuthResponse = await response.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user_id', data.user.id.toString());
      const userWithRoles = computeUserRoles(data.user);
      set({ user: userWithRoles, isAuthenticated: true, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  register: async (data: RegisterPayload) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al registrar');
      }
      const authData: AuthResponse = await response.json();
      localStorage.setItem('access_token', authData.access);
      localStorage.setItem('refresh_token', authData.refresh);
      localStorage.setItem('user_id', authData.user.id.toString());
      const userWithRoles = computeUserRoles(authData.user);
      set({ user: userWithRoles, isAuthenticated: true, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      const user: User = await getAuth(`${API_URL}/auth/profile/`);
      const userWithRoles = computeUserRoles(user);
      set({ user: userWithRoles, isAuthenticated: true });
    } catch (error) {
      try {
        const newToken = await refreshToken();
        localStorage.setItem('access_token', newToken.access);
        const user: User = await getAuth(`${API_URL}/auth/profile/`);
        const userWithRoles = computeUserRoles(user);
        set({ user: userWithRoles, isAuthenticated: true });
      } catch {
        get().logout();
      }
    }
  },

  updateProfile: async (data: Partial<User>) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/auth/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Error updating profile');
      const user: User = await response.json();
      const userWithRoles = computeUserRoles(user);
      set({ user: userWithRoles, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
