import { useSolanaWalletConnection } from "../../../core/hooks/useSolanaWalletConnection";
import { useWalletConnection } from "../../../core/hooks/useWalletConnection";
import { ROUTES } from "../../../core/constants/routes.const";
import { Link } from "react-router";
import { SiBitcoin, SiEthereum, SiSolana } from "react-icons/si";
import WalletIcon from "../../wallet/WalletIcon";
import { useBitcoinWallet } from "../../../core/context/BitcoinWallet.context";

export default function GetStarted() {
  const { isConnected } = useWalletConnection();
  const { isConnected: isSolanaConnected } = useSolanaWalletConnection();
  const { isConnected: isBitcoinConnected } = useBitcoinWallet();
  const hasConnectedBefore = localStorage.getItem("APP_INIT_CONNECTED");
  const isCurrentlyConnected =
    isConnected || isSolanaConnected || isBitcoinConnected;
  if (!isCurrentlyConnected) {
    return (
      <Link className="btn-primary" to={ROUTES.GET_STARTED}>
        {hasConnectedBefore ? "Connect" : "Get Started"}
      </Link>
    );
  }
  return (
    <Link className="btn-primary" to={ROUTES.GET_STARTED}>
      Wallets
      <span className="flex relative">
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
        {isBitcoinConnected && (
          <WalletIcon>
            <SiBitcoin />
          </WalletIcon>
        )}
      </span>
    </Link>
  );
}
