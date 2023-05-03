
import { create } from 'zustand';

// model
import { User } from 'app/model/User';

const initialUser = {
    user: new User()
};

export const useUserStore = create((set) => ({
    ...initialUser,
    increaseUser: (t) => set(() => ({ user: t})),
    decreaseUser: () => set(() => ({ user: new User()}))
}))