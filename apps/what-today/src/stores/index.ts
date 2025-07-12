import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import createAuthSlice, { type AuthSlice } from './slices/authSlice';

export const useWhatTodayStore = create<AuthSlice>()(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
    }),
    {
      name: 'what-today-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
