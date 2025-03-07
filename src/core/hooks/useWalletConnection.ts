import { useEffect } from "react";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import useWalletStore from "../stores/store"; // Your custom Zustand store

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const setAddress = useWalletStore((state) => state.setAddress);
  const balance = useBalance({
    address: address ?? undefined,
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    if (isConnected && address) {
      setAddress(address);
    }
  }, [address, isConnected, setAddress]);

  return {
    connect,
    disconnect,
    isConnected,
    address,
    balance,
    connectors,
    status,
    error,
  };
}
