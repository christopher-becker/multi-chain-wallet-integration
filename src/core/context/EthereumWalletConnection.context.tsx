import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import {
  useAccount,
  useBalance,
  UseBalanceReturnType,
  useChainId,
  useConnect,
  useDisconnect,
  Connector,
} from "wagmi";
import { Address, Chain } from "viem";
import useStore from "../stores/store";
import { useChains } from "./Chains.context";

interface WalletContextType {
  connect: (connector: Connector) => void;
  disconnect: () => void;
  isConnected: boolean;
  address: Address | string | null;
  balance: UseBalanceReturnType;
  connector: Connector | undefined;
  connectors: readonly Connector[];
  error: Error | null;
  isPending: boolean;
  chain: Chain | undefined;
  chainId: number;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const useEthWalletConnection = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error(
      "useWalletConnection must be used within a EthWalletProvider"
    );
  }
  return context;
};

interface EthWalletProviderProps {
  children: ReactNode;
}

export const EthWalletProvider = ({ children }: EthWalletProviderProps) => {
  const { filterChains, resetChainsData } = useChains();
  const { address, isConnected, chain, connector } = useAccount();

  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { setConnectedChains, removeConnectedChain } = useStore();
  const [initialized, setInitialized] = useState(false);

  const balance = useBalance({
    address: address ?? undefined,
    chainId,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (chain)
      filterChains({
        isConnected: isConnected,
        id: chain?.id,
        symbol: chain?.nativeCurrency.symbol,
        name: chain?.name,
        address: address,
      });
  }, [chain, address]);

  useEffect(() => {
    if (isConnected && address) {
      setConnectedChains("EVM");
      localStorage.setItem("APP_INIT_EVM_CONNECTED", "TRUE");
    } else {
      removeConnectedChain("EVM");
      localStorage.removeItem("APP_INIT_EVM_CONNECTED");
      resetChainsData();
    }
  }, [address, isConnected]);

  useEffect(() => {
    if (!initialized && localStorage.getItem("APP_INIT_EVM_CONNECTED")) {
      setInitialized(true);
    }
  }, [initialized]);

  const value = useMemo(
    () => ({
      chainId,
      chain,
      connect: (connector: Connector) => connect({ connector }),
      disconnect,
      isConnected,
      address: address ?? null,
      balance,
      connector,
      connectors,
      error,
      isPending,
    }),
    [isConnected, address, balance, error, chain]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
