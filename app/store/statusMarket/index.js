import { create } from 'zustand';

const initialStatus = {
    statusMarket: number = 1,
    rodadaAtual: number = 0,
    nomeRodada: string = ''
};

export const useStatusStore = create((set) => ({
    ...initialStatus, 
    increaseStatus: (s) => set(() => ({ statusMarket: s})),
    increaseRodadaAtual: (r) => set(() => ({ rodadaAtual: r})),
    increaseNomeRodada: (n) => set(() => ({ nomeRodada: n}))
}))