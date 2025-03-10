import { useEffect } from "react";
import {
  useAccount,
  useBalance,
  UseBalanceReturnType,
  useConnect,
  useDisconnect,
} from "wagmi";
import { Connector } from "wagmi";
import { Address } from "viem";
import useStore from "../stores/store";

interface WalletConnectionHook {
  connect: (connector: Connector) => void;
  disconnect: () => void;
  isConnected: boolean;
  address: Address | null;
  balance: UseBalanceReturnType;
  connectors: readonly Connector[];
  error: Error | null;
  status: "pending" | "error" | "idle" | "success";
}

export function useWalletConnection(): WalletConnectionHook {
  const { address, isConnected } = useAccount();
  const { connect: wagmiConnect, connectors, error, status } = useConnect();
  const { disconnect } = useDisconnect();
  const { fetchChains, setConnectedChains, connectedChains } = useStore();

  const balance = useBalance({
    address: address ?? undefined,
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    if (isConnected && address) {
      setConnectedChains("EVM");
      localStorage.setItem("APP_INIT_CONNECTED", "TRUE");
    } else {
      useStore.getState().removeConnectedChain("EVM");
    }
  }, [address, isConnected]);

  useEffect(() => {
    fetchChains();
  }, [connectedChains]);

  return {
    connect: (connector: Connector) => wagmiConnect({ connector }),
    disconnect,
    isConnected,
    address: address ?? null,
    // Re-Visit to fix this TS error
    balance,
    connectors,
    error,
    status,
  };
}
