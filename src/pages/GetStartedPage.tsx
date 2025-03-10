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
      <h1 className="text-4xl mb-8">
        {hasConnectedBefore
          ? isConnected || isSolanaConnected
            ? "You're Connected!"
            : "Welcome back!"
          : "Get Started"}
      </h1>
      <ConnectButton />
    </BasePage>
  );
}
