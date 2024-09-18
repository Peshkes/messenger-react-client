import {create} from "zustand";

export type Message = {
    from?: string;
    to: string;
    date: Date;
    text: string;
}

type LoadingStore = {
    messages: Message[];
    addMessage: (message: Message) => void;
    activeUser: string | null;
    selectUser: (user: string | null) => void;
}

export const useMessages = create<LoadingStore>((set) => ({
    messages: [],
    addMessage: (message) => set((state) => ({ ...state, messages: [...state.messages, message] })),
    activeUser: null,
    selectUser: (user) => set((state) => ({ ...state, activeUser: user })),
}));
