import { useBitcoinWallet } from "../context/BitcoinWallet.context";
import { useEthWalletConnection } from "../context/EthereumWalletConnection.context";
import { useSolanaWallet } from "../context/SolanaWalletConnection.context";

export function useWalletConnections() {
  const connections = {
    ethereum: useEthWalletConnection().isConnected,
    solana: useSolanaWallet().isConnected,
    bitcoin: useBitcoinWallet().isConnected,
  };

  const isCurrentlyConnected = Object.values(connections).some(Boolean);
  const hasConnectedBefore = Boolean(
    localStorage.getItem("APP_INIT_CONNECTED")
  );

  return {
    connections,
    isCurrentlyConnected,
    hasConnectedBefore,
  };
}
