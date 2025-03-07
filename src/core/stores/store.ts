import { Address } from "viem";
import { create } from "zustand";

interface WalletState {
  address: Address | null;
  setAddress: (address: Address | null) => void;
}

const useWalletStore = create<WalletState>((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
}));

export default useWalletStore;
