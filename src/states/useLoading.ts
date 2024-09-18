import {create} from "zustand";


type LoadingStore = {
    isLoading: boolean;
    setLoading: (status: boolean) => void;
}

export const useLoading = create<LoadingStore>((set) => ({
    isLoading: false,
    setLoading: (status) => set({ isLoading: status}),
}));
