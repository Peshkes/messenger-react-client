import {create} from "zustand";

type AuthenticateStore = {
    isAuthenticated: boolean;
    setAuthenticated: (status: boolean) => void;
}

export const useAuthenticate = create<AuthenticateStore>((set) => ({
    isAuthenticated: false,
    setAuthenticated: (status: boolean) => set({ isAuthenticated: status}),
}));
