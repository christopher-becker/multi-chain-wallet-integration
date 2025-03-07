import { useEffect } from "react";
import {
  useAccount,
  useBalance,
  UseBalanceParameters,
  useConnect,
  useDisconnect,
} from "wagmi";
import useWalletStore from "../stores/store";
import { Connector } from "wagmi";
import { Address } from "viem";

interface WalletConnectionHook {
  connect: (connector?: any) => void;
  disconnect: () => void;
  isConnected: boolean;
  address: Address | null;
  balance: UseBalanceParameters;
  connectors: readonly Connector[];
  error: Error | null;
}

export function useWalletConnection(): WalletConnectionHook {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
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
    address: address ?? null,
    // Re-Visit to fix this TS error
    balance,
    connectors,
    error,
  };
}
