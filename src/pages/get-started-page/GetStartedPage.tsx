import { Suspense } from "react";
import BasePage from "../BasePage";
import ChainOptions from "./components/chain-options/ChainOptions";
import { useWalletConnections } from "../../core/hooks/useWalletConnections";

export default function GetStartedPage() {
  const { hasConnectedBefore, isCurrentlyConnected } = useWalletConnections();
  return (
    <BasePage>
      <div className="flex gap-12 items-center flex-col">
        <h1 className="text-4xl" data-testid="page-heading">
          {hasConnectedBefore
            ? isCurrentlyConnected
              ? "You're connected!"
              : "Connect again!"
            : "Choose a chain"}
        </h1>
        <Suspense fallback={<>Loading ...</>}>
          <ChainOptions />
        </Suspense>
      </div>
    </BasePage>
  );
}
