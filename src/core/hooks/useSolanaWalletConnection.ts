import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Adapter, WalletName } from "@solana/wallet-adapter-base";

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
  const { publicKey, connected, connect, disconnect, wallets, select } =
    useWallet();
  const [balance, _] = useState<number | null>(null);

  // Re-Visit check balance
  // useEffect(() => {
  //   if (connected && publicKey) {
  //     connection.getBalance(publicKey).then((lamports) => {
  //       setBalance(lamports / 1e9);
  //     });
  //   } else {
  //     setBalance(null);
  //   }
  // }, [publicKey, connected, connection]);

  useEffect(() => {
    if (connected) {
      localStorage.setItem("APP_INIT_CONNECTED", "TRUE");
    }
  }, [connected]);

  const connectWallet = async (walletName: WalletName) => {
    try {
      select(walletName);
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
