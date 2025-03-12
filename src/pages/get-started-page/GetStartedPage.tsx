import { Suspense } from "react";
import BasePage from "../BasePage";
import ChainOptions from "./components/chain-options/ChainOptions";
import { useWalletConnections } from "../../core/hooks/useWalletConnections";

export default function GetStartedPage() {
  const { hasConnectedBefore, isCurrentlyConnected } = useWalletConnections();
  const connectTitle = () => {
    if (isCurrentlyConnected) {
      return "Connected";
    }
    return hasConnectedBefore ? "Re-Connect!" : "Choose a chain";
  };
  return (
    <BasePage>
      <div className="flex gap-12 items-center flex-col w-80">
        <h1 className="text-4xl" data-testid="page-heading">
          {connectTitle()}
        </h1>
        <Suspense fallback={<>Loading ...</>}>
          <ChainOptions />
        </Suspense>
      </div>
    </BasePage>
  );
}
