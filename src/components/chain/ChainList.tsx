import { useState } from "react";
import ChainFilterButton from "./ChainFilterButton";
import ChainListItem from "./ChainListItem";
import ChainListskeleton from "../skeleton/ChainListSkeleton";
import { useWalletConnections } from "../../core/hooks/useWalletConnections";
import { useEthWalletConnection } from "../../core/context/EthereumWalletConnection.context";
import { useChains } from "../../core/context/Chains.context";
import { Address } from "viem";

const PAGINATION_SIZE = 10;

export default function ChainList() {
  const { connections } = useWalletConnections();
  const { chains, error, loading, selection, filterChains } = useChains();
  const { address } = useEthWalletConnection();

  const [currentPagination, setCurrentPagination] = useState(PAGINATION_SIZE);

  return (
    <div className="flex flex-col gap-12 max-w-80 sm:max-w-2xl w-full">
      <h1>Token List</h1>
      <div className="flex flex-col gap-12">
        <div className="flex gap-2 sm:gap-4 items-center">
          <span className="hidden sm:flex">Filter</span>
          {Object.entries(connections).map(
            ([_, chain]) =>
              chain.isConnected && (
                <ChainFilterButton
                  key={`${chain.symbol}-${chain.id}`}
                  chain={chain}
                  selectedChain={selection}
                  setSelectedChain={filterChains}
                  title={chain.name}
                />
              )
          )}
        </div>
        {!chains && (
          <div className="flex flex-col gap-4">
            <h2>
              {!!error ? "Error fetching chain tokens" : "Select a chain"}
            </h2>
          </div>
        )}
      </div>
      {loading ? (
        <ChainListskeleton />
      ) : (
        <>
          {chains && Object.keys(chains.tokens || {}).length === 0 ? (
            <p>No tokens found.</p>
          ) : (
            <>
              {chains &&
                Object.entries(chains?.tokens).map(([chainId, tokens]) => {
                  const slicedTokens = tokens.slice(0, currentPagination);
                  return (
                    <div
                      key={chainId}
                      className="flex flex-col gap-12 items-center"
                    >
                      <ul className="token-list flex flex-col gap-4 w-full">
                        {slicedTokens.map((token) => (
                          <ChainListItem
                            key={`${chainId}-${token.symbol}`}
                            token={token}
                            address={address as Address}
                          />
                        ))}
                      </ul>
                      <button
                        onClick={() =>
                          setCurrentPagination(
                            (current) => (current += PAGINATION_SIZE)
                          )
                        }
                        disabled={currentPagination >= tokens.length}
                        className="btn-secondary"
                      >
                        Load More
                      </button>
                    </div>
                  );
                })}
            </>
          )}
        </>
      )}
    </div>
  );
}
