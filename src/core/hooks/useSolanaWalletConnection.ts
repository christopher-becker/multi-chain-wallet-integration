import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Adapter, WalletName } from "@solana/wallet-adapter-base";
import useStore from "../stores/store";
import { Connection } from "@solana/web3.js";

interface SolanaWalletHook {
  connectWallet: (walletName: WalletName) => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  address: string | null;
  balance: number | null;
  status: "connected" | "disconnected";
  wallets: { adapter: Adapter }[];
}

export function useSolanaWalletConnection(): SolanaWalletHook {
  const { publicKey, connected, connect, disconnect, wallets, select, wallet } =
    useWallet();
  const { fetchChains, setConnectedChains, removeConnectedChain } = useStore();
  const connectedChains = useStore((state) => state.connectedChains);
  const [balance, setBalance] = useState<number | null>(null);

  // Create Solana connection object
  const connection = new Connection("https://api.devnet.solana.com");

  // Re-Visit check balance
  useEffect(() => {
    if (connected && publicKey) {
      connection
        .getBalance(publicKey)
        .then((lamports) => {
          setBalance(lamports / 1e9); // Convert from lamports to SOL
        })
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
      localStorage.setItem("APP_INIT_CONNECTED", "TRUE");
    } else {
      removeConnectedChain("SVM");
    }
  }, [connected]);

  useEffect(() => {
    fetchChains();
  }, [connectedChains]);

  const connectWallet = async (walletName: WalletName) => {
    try {
      select(walletName);
      if (!wallet) {
        return;
      }
      await connect();
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    connectWallet,
    disconnect,
    isConnected: connected,
    address: publicKey?.toBase58() || null,
    balance,
    status: connected ? "connected" : "disconnected",
    wallets,
  };
}
