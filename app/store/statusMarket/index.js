import { create } from 'zustand';

const initialStatus = {
	statusMarket: 1,
	rodadaAtual: 0,
	nomeRodada: ''
};

export const useStatusStore = create((set) => ({
	...initialStatus, 
	increaseStatus: (s) => set(() => ({ statusMarket: s})),
	increaseRodadaAtual: (r) => set(() => ({ rodadaAtual: r})),
	increaseNomeRodada: (n) => set(() => ({ nomeRodada: n}))
}))