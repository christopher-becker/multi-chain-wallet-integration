import { Suspense } from "react";
import { useSolanaWalletConnection } from "../../core/hooks/useSolanaWalletConnection";
import { useWalletConnection } from "../../core/hooks/useWalletConnection";
import BasePage from "../BasePage";
import ChainOptions from "./components/chain-options/ChainOptions";
import { useBitcoinWallet } from "../../core/context/BitcoinWallet.context";

export default function GetStartedPage() {
  const { isConnected } = useWalletConnection();
  const { isConnected: isSolanaConnected } = useSolanaWalletConnection();
  const { isConnected: isBitcoinConnected } = useBitcoinWallet();
  const hasConnectedBefore = localStorage.getItem("APP_INIT_CONNECTED");
  return (
    <BasePage>
      <div className="flex gap-12 items-center flex-col">
        <h1 className="text-4xl">
          {hasConnectedBefore
            ? isConnected || isSolanaConnected || isBitcoinConnected
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
