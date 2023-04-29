import { create } from 'zustand';

const initialToken = {
    token: '',
};

export const useTokenStore = create((set) => ({
    ...initialToken, 
    increaseToken: (t) => set(() => ({ token: t})),
    decreaseToken: () => set(() => ({ token: ''}))
}))