import { Link } from "react-router";
import { ROUTES } from "../../../../core/constants/routes.const";
import { useWalletConnections } from "../../../../core/hooks/useWalletConnections";

export default function GetStarted() {
  const { hasConnectedBefore, isCurrentlyConnected } = useWalletConnections();
  if (isCurrentlyConnected) return null;
  return (
    <div className="w-80 flex flex-col gap-12 px-2">
      <h1>{hasConnectedBefore ? "Welcome back!" : "Get started!"}</h1>
      <p>
        {hasConnectedBefore
          ? "We're excited to have you back. Your wallet is ready to connect and explore the latest tokens."
          : "Connect your wallet and start exploring tokens."}
      </p>
      <Link className="btn-secondary w-fit" to={ROUTES.GET_STARTED}>
        {hasConnectedBefore ? "Re-connect" : "Get Started"}
      </Link>
    </div>
  );
}
