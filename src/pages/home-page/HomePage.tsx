import BasePage from "../BasePage";
import ChainList from "../../components/chain/ChainList";
import { Suspense } from "react";
import GetStarted from "./components/get-started/GetStarted";
import { useWalletConnections } from "../../core/hooks/useWalletConnections";

export default function HomePage() {
  const { isCurrentlyConnected } = useWalletConnections();
  return (
    <BasePage centerContent={false}>
      {isCurrentlyConnected ? (
        <Suspense fallback={<>Loading ...</>}>
          <ChainList />
        </Suspense>
      ) : (
        <GetStarted />
      )}
    </BasePage>
  );
}
