import { create } from "zustand";
import { LiFiChainsType } from "../types/liFi.types";
import { getLiFiChains } from "../../api/liFiAPI";

// Define your store with Zustand
interface StoreState {
  connectedChains: string[] | undefined;
  setConnectedChains: (chainType: string) => void;
  removeConnectedChain: (chainType: string) => void;
  chains: LiFiChainsType | undefined | null;
  loading: boolean;
  error: string | null;
  fetchChains: (chain?: string) => void;
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
  fetchChains: async (chain?: string) => {
    set({ loading: true, error: null });
    try {
      const { connectedChains } = useStore.getState();
      if (!connectedChains || connectedChains.length === 0) {
        set({ chains: null, loading: false });
        return;
      }

      const data = await getLiFiChains(chain ?? connectedChains.join(","));
      set({ chains: data, loading: false });
    } catch (err) {
      set({ loading: false, error: "An error occurred" });
    }
  },
}));

export default useStore;
