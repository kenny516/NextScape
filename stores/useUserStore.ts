'use client';

import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
}

interface UserState {
    user: User | null;
    isHydrated: boolean;
    setUser: (user: User | null) => void;
    setHydrated: (hydrated: boolean) => void;
    resetStore: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isHydrated: false,
            setUser: (user) => set({ user }),
            setHydrated: (hydrated) => set({ isHydrated: hydrated }),
            resetStore: () => {
                set({ user: null, isHydrated: false });
                if (typeof window !== 'undefined') {
                    useUserStore.persist.clearStorage();
                    localStorage.removeItem("user-storage");
                    sessionStorage.removeItem("user-storage");
                }
            },
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
            partialize: (state) => ({ user: state.user }),
        }
    )
);