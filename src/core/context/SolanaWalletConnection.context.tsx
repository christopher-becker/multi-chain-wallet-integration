import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Adapter, WalletName } from "@solana/wallet-adapter-base";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import useStore from "../stores/store";
import { SOLANA_API } from "../constants/config.const";
import { useChains } from "./Chains.context";

interface SolanaWalletContextType {
  connecting: boolean;
  connectWallet: (walletName: WalletName) => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  address: string | null;
  balance: number | null;
  status: "connected" | "disconnected";
  wallets: { adapter: Adapter }[];
}

const SolanaWalletContext = createContext<SolanaWalletContextType | null>(null);

export const useSolanaWallet = () => {
  const context = useContext(SolanaWalletContext);
  if (!context) {
    throw new Error(
      "useSolanaWallet must be used within a SolanaWalletProvider"
    );
  }
  return context;
};

interface SolanaWalletProviderProps {
  children: ReactNode;
}

export const SolanaWalletProvider = ({
  children,
}: SolanaWalletProviderProps) => {
  const {
    publicKey,
    connected,
    connect,
    disconnect,
    wallets,
    select,
    wallet,
    connecting,
  } = useWallet();
  const { setConnectedChains, removeConnectedChain } = useStore();
  const [balance, setBalance] = useState<number | null>(null);
  const connection = new Connection(SOLANA_API);
  const { resetChainsData } = useChains();

  useEffect(() => {
    if (connected && publicKey) {
      connection
        .getBalance(publicKey)
        .then((lamports) => setBalance(lamports / LAMPORTS_PER_SOL))
        .catch((error) => {
          console.error("Failed to fetch balance:", error);
          setBalance(null);
        });
    } else {
      setBalance(null);
    }
  }, [publicKey, connected]);

  useEffect(() => {
    if (connected) {
      setConnectedChains("SVM");
      localStorage.setItem("APP_INIT_SVM_CONNECTED", "TRUE");
    } else {
      removeConnectedChain("SVM");
      localStorage.removeItem("APP_INIT_SVM_CONNECTED");
      resetChainsData();
    }
  }, [connected]);

  const connectWallet = async (walletName: WalletName) => {
    try {
      select(walletName);
      if (!wallet) return;
      await connect();
    } catch (error) {
      console.error("Solana wallet connection failed:", error);
    }
  };

  const value: SolanaWalletContextType = useMemo(
    () => ({
      connecting,
      connectWallet,
      disconnect,
      isConnected: connected,
      address: publicKey?.toBase58() || null,
      balance,
      status: connected
        ? "connected"
        : ("disconnected" as "connected" | "disconnected"),
      wallets,
    }),
    [connected, publicKey, balance, connecting]
  );

  return (
    <SolanaWalletContext.Provider value={value}>
      {children}
    </SolanaWalletContext.Provider>
  );
};
