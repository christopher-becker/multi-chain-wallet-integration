import WalletBalance from "./components/wallet/WalletBalance";
import { useWalletConnection } from "./core/hooks/useWalletConnection";

function App() {
  const { connect, disconnect, isConnected, address, connectors } =
    useWalletConnection();

  const renderWalletContent = () => {
    if (!isConnected) {
      return (
        <>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              onClick={() => connect({ connector })}
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
    <>
      <h1 className="text-4xl">multi-chain-wallet-integration</h1>
      {renderWalletContent()}
    </>
  );
}

export default App;
