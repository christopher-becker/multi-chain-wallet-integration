import { create } from "zustand";

interface ModalState {
  // Wagmi Modals state
  isWagmiOptionsModalVisible: boolean;
  setIsWagmiOptionsModalVisible: (data: boolean) => void;
  // Solana Modals state
  isSolanaOptionsModalVisible: boolean;
  setIsSolanaOptionsModalVisible: (data: boolean) => void;
  // Bitcoin Modals state
  isBitcoinOptionsModalVisible: boolean;
  setIsBitcoinOptionsModalVisible: (data: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  // Wagmi Modals
  isWagmiOptionsModalVisible: false,
  setIsWagmiOptionsModalVisible: (data: boolean) =>
    set({ isWagmiOptionsModalVisible: data }),

  // Solana Modals
  isSolanaOptionsModalVisible: false,
  setIsSolanaOptionsModalVisible: (data: boolean) =>
    set({ isSolanaOptionsModalVisible: data }),

  // Bitcoin Modals
  isBitcoinOptionsModalVisible: false,
  setIsBitcoinOptionsModalVisible: (data: boolean) =>
    set({ isBitcoinOptionsModalVisible: data }),
}));

export default useModalStore;
