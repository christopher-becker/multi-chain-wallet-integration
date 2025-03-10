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
              className="btn-secondary"
            >
              <img
                src={connector.icon}
                alt={connector.name}
                className="w-6 h-6"
              />
              {connector.name}
            </button>
          ))}
        </>
      );
    }
    return (
      <>
        <p>{address}</p>
        <WalletBalance />
        <button className="btn-primary" onClick={() => disconnect()}>
          Disconnect Wallet
        </button>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h2>Connect Ethereum</h2>
      {renderWalletContent()}
    </div>
  );
}
