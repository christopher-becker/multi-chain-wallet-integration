import useStore from "../../core/stores/store";
import { ChainType } from "../../core/types/liFi.types";

export default function ChainList() {
  const { chains, error, fetchChains, connectedChains } = useStore();

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
    <div className="flex flex-col gap-12">
      <div className="flex gap-4 items-center">
        {isConnectedManyChains ? (
          <>
            <span>Filter</span>
            <button className="btn-secondary" onClick={() => fetchChains()}>
              All
            </button>
          </>
        ) : null}

        {connectedChains?.includes("EVM") && isConnectedManyChains && (
          <button className="btn-secondary" onClick={() => fetchChains("EVM")}>
            Ethereum
          </button>
        )}
        {connectedChains?.includes("SVM") && isConnectedManyChains && (
          <button className="btn-secondary" onClick={() => fetchChains("SVM")}>
            Solana
          </button>
        )}
      </div>
      <ul className="flex flex-col gap-4">
        {chains?.chains.map((chain: ChainType) => (
          <li key={chain.id} className="flex gap-4 items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={chain.logoURI}
              alt={chain.name}
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
