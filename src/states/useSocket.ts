import {create} from "zustand";


type SocketStore = {
    socket: WebSocket | null;
    setSocket: (socket: WebSocket | null) => void;
}

export const useSocket = create<SocketStore>((set) => ({
    socket: null,
    setSocket: (socket) => set({ socket }),
}));
