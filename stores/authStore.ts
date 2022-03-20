import create from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface IStore {
  user: User | undefined;
  setUser: (a: User | null) => void;
  signout: () => void;
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: undefined as User | undefined,
      setUser: (user: User | undefined) => set({ user }),
      signout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
