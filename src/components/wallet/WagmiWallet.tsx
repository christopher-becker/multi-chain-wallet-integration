import { useWalletConnection } from "../../core/hooks/useWalletConnection";
import WalletBalance from "./WalletBalance";

export default function WagmiWallet() {
  const { connect, disconnect, isConnected, address, connectors } =
    useWalletConnection();

  const renderWalletContent = () => {
    if (!isConnected) {
      return (
        <>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect(connector)}
              type="button"
              className="btn-primary"
            >
              {connector.name}
            </button>
          ))}
        </>
      );
    }
    return (
      <div className="flex flex-col gap-4">
        <p>{address}</p>
        <WalletBalance />
        <button className="btn-primary" onClick={() => disconnect()}>
          Disconnect Wallet
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2>Wagmi</h2>
      {renderWalletContent()}
    </div>
  );
}
