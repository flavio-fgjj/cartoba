
import { create } from 'zustand';

// model
import { User } from 'app/model/User';

const initialUser = {
    user: User
};

export const useUserStore = create((set) => ({
    ...initialUser, 
    increaseUser: (t: User) => set(() => ({ user: t})),
    decreaseUser: () => set(() => ({ user: new User()}))
}))