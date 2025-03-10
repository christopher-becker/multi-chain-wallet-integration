import { useSolanaWalletConnection } from "../../../core/hooks/useSolanaWalletConnection";
import { useWalletConnection } from "../../../core/hooks/useWalletConnection";
import { ROUTES } from "../../../core/constants/routes.const";
import { Link } from "react-router";
import { SiEthereum, SiSolana } from "react-icons/si";
import WalletIcon from "../../wallet/WalletIcon";

export default function GetStarted() {
  const { isConnected } = useWalletConnection();
  const { isConnected: isSolanaConnected } = useSolanaWalletConnection();
  const hasConnectedBefore = localStorage.getItem("APP_INIT_CONNECTED");
  if (!isConnected && !isSolanaConnected) {
    return (
      <Link className="btn-primary" to={ROUTES.GET_STARTED}>
        {hasConnectedBefore ? "Connect" : "Get Started"}
      </Link>
    );
  }
  return (
    <Link className="btn-primary" to={ROUTES.GET_STARTED}>
      Connected
      <span className="flex">
        {isConnected && (
          <WalletIcon>
            <SiEthereum />
          </WalletIcon>
        )}
        {isSolanaConnected && (
          <WalletIcon>
            <SiSolana />
          </WalletIcon>
        )}
      </span>
    </Link>
  );
}
