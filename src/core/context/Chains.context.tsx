import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { TokensResponseType } from "../types/liFi.types";
import { getChainTokens } from "../../api/liFiAPI";
import { ConnectionType } from "../types/connection.types";

interface ChainsContextType {
  chains: TokensResponseType | null;
  loading: boolean;
  error: string | null;
  fetchChains: (chain: string) => void;
  selection: {
    chain: string;
    address: string | undefined;
  } | null;
  filterChains: (chain: ConnectionType) => void;
  setChainsData: (data: TokensResponseType | null) => void;
}

const ChainsContext = createContext<ChainsContextType | null>(null);

export const useChains = (): ChainsContextType => {
  const context = useContext(ChainsContext);
  if (!context) {
    throw new Error("useChains must be used within a ChainsProvider");
  }
  return context;
};

interface ChainsProviderProps {
  children: ReactNode;
}

export const ChainsProvider = ({ children }: ChainsProviderProps) => {
  const [chains, setChains] = useState<TokensResponseType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selection, setSelection] = useState<{
    chain: string;
    address: string | undefined;
  } | null>(null);

  const fetchChains = useCallback(async (chain: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getChainTokens(chain);
      setChains(data);
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const filterChains = useCallback(
    (chain: ConnectionType) => {
      if (chain.address && chain.symbol) {
        setSelection({ chain: chain.symbol, address: chain.address });
        fetchChains(chain.symbol);
      }
    },
    [fetchChains]
  );

  const setChainsData = useCallback((data: TokensResponseType | null) => {
    setChains(data);
  }, []);

  useEffect(() => {
    if (!selection) return;
    fetchChains(selection.chain);
  }, [selection, fetchChains]);

  const value = useMemo(
    () => ({
      chains,
      loading,
      error,
      fetchChains,
      selection,
      filterChains,
      setChainsData,
    }),
    [
      chains,
      loading,
      error,
      fetchChains,
      selection,
      filterChains,
      setChainsData,
    ]
  );

  return (
    <ChainsContext.Provider value={value}>{children}</ChainsContext.Provider>
  );
};
