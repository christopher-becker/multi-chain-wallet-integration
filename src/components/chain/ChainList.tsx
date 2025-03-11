import { useState } from "react";
import useStore from "../../core/stores/store";
import { ChainType } from "../../core/types/liFi.types";
import ChainFilterButton from "./ChainFilterButton";
import ChainListItem from "./ChainListItem";
import ChainListskeleton from "../skeleton/ChainListSkeleton";

export default function ChainList() {
  const { chains, error, fetchChains, connectedChains, loading } = useStore();
  const [selectedChain, setSelectedChain] = useState<string>("all");

  const isConnectedManyChains = connectedChains && connectedChains?.length > 1;

  if (error)
    return (
      <div className="flex flex-col gap-4">
        <h2>ErrorFetching chain.</h2>
        <button className="btn-secondary" onClick={() => fetchChains()}>
          Try Again
        </button>
      </div>
    );

  return (
    <div className="flex flex-col gap-12 max-w-80 sm:max-w-2xl w-full">
      <h1>Token List</h1>
      {isConnectedManyChains && (
        <div className="flex gap-2 sm:gap-4 items-center">
          {isConnectedManyChains ? (
            <>
              <span className="hidden sm:flex">Filter</span>
              <ChainFilterButton
                chain="all"
                fetchChains={fetchChains}
                selectedChain={selectedChain}
                setSelectedChain={setSelectedChain}
                title={"All"}
              />
            </>
          ) : null}

          {connectedChains?.includes("EVM") && isConnectedManyChains && (
            <ChainFilterButton
              chain="EVM"
              fetchChains={fetchChains}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
              title={"Ethereum"}
            />
          )}
          {connectedChains?.includes("SVM") && isConnectedManyChains && (
            <ChainFilterButton
              chain="SVM"
              fetchChains={fetchChains}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
              title={"Solana"}
            />
          )}
          {connectedChains?.includes("BTC") && isConnectedManyChains && (
            <ChainFilterButton
              chain="UTXO"
              fetchChains={fetchChains}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
              title={"Bitcoin"}
            />
          )}
        </div>
      )}
      {loading ? (
        <ChainListskeleton />
      ) : (
        <ul className="flex flex-col gap-4">
          {chains?.chains.map((chain: ChainType) => (
            <ChainListItem key={chain.id} chain={chain} />
          ))}
        </ul>
      )}
    </div>
  );
}
