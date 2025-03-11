import { useEffect } from "react";
import {
  useAccount,
  useBalance,
  UseBalanceReturnType,
  useChainId,
  useConnect,
  useDisconnect,
} from "wagmi";
import { Connector } from "wagmi";
import { Address } from "viem";
import useStore from "../stores/store";

interface WalletConnectionHook {
  isPending: boolean;
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
  const {
    connect: wagmiConnect,
    connectors,
    error,
    status,
    isPending,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const {
    fetchChains,
    setConnectedChains,
    connectedChains,
    removeConnectedChain,
  } = useStore();

  const balance = useBalance({
    address: address ?? undefined,
    chainId,
    query: {
      enabled: !!address,
    },
  });

  useEffect(() => {
    if (isConnected && address) {
      setConnectedChains("EVM");
      localStorage.setItem("APP_INIT_CONNECTED", "TRUE");
    } else {
      removeConnectedChain("EVM");
    }
  }, [address, isConnected]);

  useEffect(() => {
    fetchChains();
  }, [connectedChains]);

  return {
    isPending,
    connect: (connector: Connector) => wagmiConnect({ connector }),
    disconnect,
    isConnected,
    address: address ?? null,
    balance,
    connectors,
    error,
    status,
  };
}
