import {create} from 'zustand';

type UserListStore = {
    username: string | null;
    setUsername: (username: string | null) => void;
    userList: string[];
    setUserList: (users: string[]) => void;
}

export const useUserList = create<UserListStore>((set) => ({
    username: null,
    setUsername: (username: string | null) => set({ username }),
    userList: [],
    setUserList: (users: string[]) => set({ userList: users }),
}));
