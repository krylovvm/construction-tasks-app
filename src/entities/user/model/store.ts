import { create } from 'zustand';
import { findUserByName, createUser } from '../api/userApi';
import { User } from './types';

interface UserState {
  currentUser: User | null;
  login: (name: string) => Promise<User>;
  logout: () => void;
}

export const useUserStore = create<UserState>(set => ({
  currentUser: null,
  login: async (name: string) => {
    let user = await findUserByName(name);
    if (!user) user = await createUser(name);
    set({ currentUser: user });
    return user;
  },
  logout: () => set({ currentUser: null }),
}));
