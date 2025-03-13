import { create } from "zustand";
import { TokensResponseType } from "../types/liFi.types";
import { getChainTokens } from "../../api/liFiAPI";

interface StoreState {
  connectedChains: string[] | undefined;
  setConnectedChains: (chainType: string) => void;
  removeConnectedChain: (chainType: string) => void;
  chains: TokensResponseType | undefined | null;
  loading: boolean;
  error: string | null;
  fetchChains: (chain: string) => void;
}

const useStore = create<StoreState>((set) => ({
  connectedChains: [],
  setConnectedChains: (newChain: string) =>
    set((state) => {
      if (!state.connectedChains) {
        return { connectedChains: [newChain] };
      }
      if (!state.connectedChains.includes(newChain)) {
        return { connectedChains: [...state.connectedChains, newChain] };
      }
      return state;
    }),
  removeConnectedChain: (chain: string) =>
    set((state) => {
      return {
        connectedChains:
          state.connectedChains &&
          state?.connectedChains.filter((c) => c !== chain),
      };
    }),
  chains: undefined,
  loading: false,
  error: null,
  fetchChains: async (chain: string) => {
    set({ loading: true, error: null });
    try {
      const data = await getChainTokens(chain);
      set({ chains: data, loading: false });
    } catch (err) {
      set({ loading: false, error: "An error occurred" });
    }
  },
}));

export default useStore;
