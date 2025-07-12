import type { StateCreator } from 'zustand';

interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSlice {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isLoggedIn: boolean;

  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
}

const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  isLoggedIn: false,

  setAccessToken: (token) => set({ accessToken: token, isLoggedIn: true }),
  setRefreshToken: (token) => set({ refreshToken: token, isLoggedIn: true }),
  setUser: (user) => set({ user }),
  clearAuth: () => set({ accessToken: null, refreshToken: null, user: null, isLoggedIn: false }),
});

export default createAuthSlice;
