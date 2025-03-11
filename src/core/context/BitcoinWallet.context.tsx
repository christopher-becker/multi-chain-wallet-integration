declare global {
  interface Window {
    unisat?: {
      requestAccounts: () => Promise<string[]>;
    };
  }
}

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useStore from "../stores/store";
import { BitcoinWalletContextType, UTXOType } from "../types/bitcoin.types";
import { MEMPOOL_API, UNISAT_PUBLIC_URL } from "../constants/config.const";

const BitcoinWalletContext = createContext<BitcoinWalletContextType | null>(
  null
);

export const useBitcoinWallet = () => {
  const context = useContext(BitcoinWalletContext);
  if (!context) {
    throw new Error(
      "useBitcoinWallet must be used within a BitcoinWalletProvider"
    );
  }
  return context;
};

interface BitcoinWalletProviderProps {
  children: React.ReactNode;
}

export const BitcoinWalletProvider = ({
  children,
}: BitcoinWalletProviderProps) => {
  const [address, setAddress] = useState<string | undefined>();
  const [balance, setBalance] = useState<number | undefined>();
  const [isConnected, setIsConnected] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined | ReactNode>();

  const { setConnectedChains, removeConnectedChain } = useStore();

  const errorMessage = (
    <>
      Wallet not found.{" "}
      <a href={UNISAT_PUBLIC_URL} target="_blank">
        Install Unisat
      </a>
      .
    </>
  );

  // Connect to Unisat Wallet
  const connect = async () => {
    setIsPending(true);
    if (window.unisat) {
      try {
        const accounts = await window.unisat.requestAccounts();
        setAddress(accounts[0]);
        setIsConnected(true);
        localStorage.setItem("APP_INIT_CONNECTED", "TRUE");
      } catch (err) {
        setError("Failed to connect to Bitcoin wallet.");
      }
    } else {
      setError(errorMessage);
    }
    setIsPending(false);
  };

  // Disconnect Wallet
  const disconnect = () => {
    setAddress(undefined);
    setIsConnected(false);
    localStorage.removeItem("APP_INIT_BITCOIN_CONNECTED");
  };

  useEffect(() => {
    if (isConnected && address) {
      setConnectedChains("BTC");
      localStorage.setItem("APP_INIT_CONNECTED", "TRUE");
      localStorage.setItem("APP_INIT_BITCOIN_CONNECTED", "TRUE");
    } else {
      removeConnectedChain("BTC");
    }
  }, [address, isConnected]);

  // Fetch balance from UTXO data
  useEffect(() => {
    if (!address) return;

    const fetchBalance = async () => {
      try {
        const response = await fetch(`${MEMPOOL_API}/address/${address}/utxo`);
        const utxos = await response.json();
        const totalBalance = utxos.reduce(
          (acc: number, utxo: UTXOType) => acc + utxo.value,
          0
        );
        setBalance(totalBalance / 1e8);
      } catch (err) {
        setError("Failed to fetch Bitcoin balance.");
      }
    };

    fetchBalance();
  }, [address]);

  useEffect(() => {
    if (localStorage.getItem("APP_INIT_BITCOIN_CONNECTED")) {
      connect();
    }
  }, []);

  const value = useMemo(
    () => ({
      connect,
      disconnect,
      isConnected,
      address,
      balance,
      error,
      isPending,
    }),
    [isConnected, address, balance, error]
  );

  return (
    <BitcoinWalletContext.Provider value={value}>
      {children}
    </BitcoinWalletContext.Provider>
  );
};
