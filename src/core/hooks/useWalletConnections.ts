import { useEffect } from "react";
import { useBitcoinWallet } from "../context/BitcoinWallet.context";
import { useEthWalletConnection } from "../context/EthereumWalletConnection.context";
import { useSolanaWallet } from "../context/SolanaWalletConnection.context";
import { ConnectionsType } from "../types/connection.types";

export function useWalletConnections() {
  const connections: ConnectionsType = {
    ethereum: {
      isConnected: useEthWalletConnection().isConnected,
      id: useEthWalletConnection().chain?.id,
      symbol: useEthWalletConnection().chain?.nativeCurrency.symbol,
      name: useEthWalletConnection().chain?.name,
      address: useEthWalletConnection().address,
    },
    solana: {
      isConnected: useSolanaWallet().isConnected,
      id: 1,
      symbol: "SOL",
      name: "Solana",
      address: useSolanaWallet().address,
    },
    bitcoin: {
      isConnected: useBitcoinWallet().isConnected,
      id: 1,
      symbol: "BTC",
      name: "Bitcoin",
      address: useBitcoinWallet().address,
    },
  };

  const isCurrentlyConnected = Object.values(connections).some(
    (wallet) => wallet.isConnected
  );
  const hasConnectedBefore = Boolean(
    localStorage.getItem("APP_INIT_CONNECTED")
  );

  useEffect(() => {
    localStorage.setItem("APP_INIT_CONNECTED", "TRUE");
  }, [connections]);

  return {
    connections,
    isCurrentlyConnected,
    hasConnectedBefore,
  };
}
