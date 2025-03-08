import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";

interface SolanaWalletHook {
  connectWallet: (walletName: WalletName) => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  address: string | null;
  balance: number | null;
  status: "connected" | "disconnected";
  wallets: { adapter: { name: WalletName } }[];
}

export function useSolanaWalletConnection(): SolanaWalletHook {
  const { publicKey, connected, connect, disconnect, wallets, select } =
    useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

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
