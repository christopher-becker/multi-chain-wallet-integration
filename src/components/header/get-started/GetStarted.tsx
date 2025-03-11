import { useSolanaWalletConnection } from "../../../core/hooks/useSolanaWalletConnection";
import { useWalletConnection } from "../../../core/hooks/useWalletConnection";
import { ROUTES } from "../../../core/constants/routes.const";
import { Link } from "react-router";
import { SiBitcoin, SiEthereum, SiSolana } from "react-icons/si";
import WalletIcon from "../../wallet/WalletIcon";
import { useBitcoinWallet } from "../../../core/context/BitcoinWallet.context";

export default function GetStarted() {
  const connections = {
    ethereum: useWalletConnection().isConnected,
    solana: useSolanaWalletConnection().isConnected,
    bitcoin: useBitcoinWallet().isConnected,
  };

  const isCurrentlyConnected = Object.values(connections).some(Boolean);
  const hasConnectedBefore = !!localStorage.getItem("APP_INIT_CONNECTED");

  if (!isCurrentlyConnected) {
    return (
      <Link
        className="btn-primary"
        to={ROUTES.GET_STARTED}
        data-testid="header-get-started-button"
      >
        {hasConnectedBefore ? "Connect" : "Get Started"}
      </Link>
    );
  }
  return (
    <Link
      className="btn-primary"
      to={ROUTES.GET_STARTED}
      data-testid="header-get-started-button"
    >
      Wallets
      <span className="flex relative">
        {Object.entries(connections).map(([chain, isConnected]) =>
          isConnected ? (
            <WalletIcon key={chain}>
              {chain === "ethereum" && <SiEthereum />}
              {chain === "solana" && <SiSolana />}
              {chain === "bitcoin" && <SiBitcoin />}
            </WalletIcon>
          ) : null
        )}
      </span>
    </Link>
  );
}
