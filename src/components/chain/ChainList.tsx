import { useState } from "react";
import useStore from "../../core/stores/store";
import { ChainType } from "../../core/types/liFi.types";
import ChainOptionButton from "./ChainOptionButton";

export default function ChainList() {
  const { chains, error, fetchChains, connectedChains } = useStore();
  const [selectedChain, setSelectedChain] = useState<string>("all");

  //   const { data: chains, isLoading, error } = useFetchChains();

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
    <div className="flex flex-col gap-12 max-w-80 w-full">
      <h1>Token List</h1>
      {isConnectedManyChains && (
        <div className="flex gap-2 sm:gap-4 items-center">
          {isConnectedManyChains ? (
            <>
              <span>Filter</span>
              <ChainOptionButton
                chain="all"
                fetchChains={fetchChains}
                selectedChain={selectedChain}
                setSelectedChain={setSelectedChain}
                title={"All"}
              />
            </>
          ) : null}

          {connectedChains?.includes("EVM") && isConnectedManyChains && (
            <ChainOptionButton
              chain="EVM"
              fetchChains={fetchChains}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
              title={"Ethereum"}
            />
          )}
          {connectedChains?.includes("SVM") && isConnectedManyChains && (
            <ChainOptionButton
              chain="SVM"
              fetchChains={fetchChains}
              selectedChain={selectedChain}
              setSelectedChain={setSelectedChain}
              title={"Solana"}
            />
          )}
        </div>
      )}
      <ul className="flex flex-col gap-4">
        {chains?.chains.map((chain: ChainType) => (
          <li key={chain.id} className="flex gap-4 items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={chain.logoURI}
              alt={chain.name}
              loading={"lazy"}
            />
            <div>
              <div className="flex gap-2">
                <span className="font-bold">{chain.name}</span>
                <span className="uppercase text-gray-500">{chain.coin}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
