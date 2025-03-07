import { create } from "zustand";

interface WalletState {
  address: string | null;
  setAddress: (address: string | null) => void;
}

const useWalletStore = create<WalletState>((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
}));

export default useWalletStore;
