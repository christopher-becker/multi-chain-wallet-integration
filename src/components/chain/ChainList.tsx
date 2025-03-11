import { useState } from "react";
import useStore from "../../core/stores/store";
import { ChainType } from "../../core/types/liFi.types";
import ChainFilterButton from "./ChainFilterButton";
import ChainListItem from "./ChainListItem";
import ChainListskeleton from "../skeleton/ChainListSkeleton";

export default function ChainList() {
  const { chains, error, fetchChains, connectedChains, loading } = useStore();
  const [selectedChain, setSelectedChain] = useState<string>("all");

  const isConnectedToManyChains =
    connectedChains && connectedChains?.length > 1;

  if (error)
    return (
      <div className="flex flex-col gap-4">
        <h2>ErrorFetching chain.</h2>
        <button className="btn-secondary" onClick={() => fetchChains()}>
          Try Again
        </button>
      </div>
    );

  const chainFilters = [
    { key: "all", chain: "all", title: "All" },
    { key: "EVM", chain: "EVM", title: "Ethereum" },
    { key: "SVM", chain: "SVM", title: "Solana" },
    { key: "BTC", chain: "UTXO", title: "Bitcoin" },
  ].filter(({ key }) => connectedChains?.includes(key) || key === "all");

  return (
    <div className="flex flex-col gap-12 max-w-80 sm:max-w-2xl w-full">
      <h1>Token List</h1>
      {isConnectedToManyChains && (
        <div className="flex gap-2 sm:gap-4 items-center">
          <span className="hidden sm:flex">Filter</span>
          {chainFilters.map(({ key, chain, title }) => (
            <ChainFilterButton
              key={key}
              chain={chain}
              fetchChains={fetchChains}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
              title={title}
            />
          ))}
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
