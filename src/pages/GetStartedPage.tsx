import { Suspense } from "react";
import ConnectButton from "../components/wallet/connect-button/ConnectButton";
import { useSolanaWalletConnection } from "../core/hooks/useSolanaWalletConnection";
import { useWalletConnection } from "../core/hooks/useWalletConnection";
import BasePage from "./BasePage";

export default function GetStartedPage() {
  const { isConnected } = useWalletConnection();
  const { isConnected: isSolanaConnected } = useSolanaWalletConnection();
  const hasConnectedBefore = localStorage.getItem("APP_INIT_CONNECTED");
  return (
    <BasePage>
      <div className="flex gap-12 items-center flex-col">
        <h1 className="text-4xl">
          {hasConnectedBefore
            ? isConnected || isSolanaConnected
              ? "You're connected!"
              : "Connect again!"
            : "Choose a chain"}
        </h1>
        <Suspense fallback={<>Loading ...</>}>
          <ConnectButton />
        </Suspense>
      </div>
    </BasePage>
  );
}
