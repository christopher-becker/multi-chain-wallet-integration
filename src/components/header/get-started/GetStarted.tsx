import { ROUTES } from "../../../core/constants/routes.const";
import { Link } from "react-router";
import WalletIcon from "../../wallet/WalletIcon";
import { useWalletConnections } from "../../../core/hooks/useWalletConnections";
import { getCoinIconUrl } from "../../../core/utils/coinIconUrl.util";
import { ConnectionType } from "../../../core/types/connection.types";

export default function GetStarted() {
  const { hasConnectedBefore, isCurrentlyConnected, connections } =
    useWalletConnections();

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
        {Object.entries(connections).map(([_, chain]) => {
          return (
            chain.isConnected && (
              <WalletIcon key={chain.symbol}>
                <img
                  src={getCoinIconUrl<ConnectionType>(chain)}
                  alt={chain.name}
                />
              </WalletIcon>
            )
          );
        })}
      </span>
    </Link>
  );
}
