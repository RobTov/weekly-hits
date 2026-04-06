export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'administrator' | 'musical_programmer';
  is_active: boolean;
  created_at: string;
  is_administrator?: boolean;
  is_musical_programmer?: boolean;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  role?: 'administrator' | 'musical_programmer';
};

export type AuthResponse = {
  refresh: string;
  access: string;
  user: User;
};

export type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
};

export type UserStore = {
  users: User[];
  loading: boolean;
  error: string | null;
  getUsers: () => Promise<void>;
  getUserById: (id: number) => Promise<User | null>;
  createUser: (data: RegisterPayload) => Promise<void>;
  updateUser: (id: number, data: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
};
