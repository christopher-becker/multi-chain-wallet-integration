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
  selection: { chain: string; address: string } | null;
  filterChains: (chain: ConnectionType) => void;
  resetChainsData: () => void;
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
  const [state, setState] = useState<{
    chains: TokensResponseType | null;
    loading: boolean;
    error: string | null;
    selection: { chain: string; address: string } | null;
  }>({
    chains: null,
    loading: false,
    error: null,
    selection: null,
  });

  const fetchChains = useCallback(async (chain: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await getChainTokens(chain);
      setState((prev) => ({ ...prev, chains: data }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Unable to fetch token list",
        chains: null,
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const filterChains = useCallback((chain: ConnectionType) => {
    setState((prev) => ({
      ...prev,
      selection:
        chain.symbol && chain.address
          ? { chain: chain.symbol, address: chain.address }
          : null,
    }));
  }, []);

  const resetChainsData = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selection: null,
      chains: null,
    }));
  }, []);

  useEffect(() => {
    if (state.selection) {
      fetchChains(state.selection.chain);
    }
  }, [state.selection, fetchChains]);

  const value = useMemo(
    () => ({
      ...state,
      fetchChains,
      filterChains,
      resetChainsData,
    }),
    [state, fetchChains, filterChains]
  );

  return (
    <ChainsContext.Provider value={value}>{children}</ChainsContext.Provider>
  );
};
