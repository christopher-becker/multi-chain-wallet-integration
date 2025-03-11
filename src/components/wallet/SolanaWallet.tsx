import { useSolanaWallet } from "../../core/context/SolanaWalletConnection.context";

export default function SolanaWallet() {
  const {
    connectWallet,
    disconnect,
    isConnected,
    address,
    wallets,
    connecting,
  } = useSolanaWallet();

  const renderWalletContent = () => {
    if (!isConnected) {
      return (
        <>
          {wallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              onClick={() => connectWallet(wallet.adapter.name)}
              type="button"
              className="btn-secondary"
            >
              <img
                src={wallet.adapter.icon}
                alt={wallet.adapter.name}
                className="w-6 h-6"
              />
              {wallet.adapter.name}
            </button>
          ))}
        </>
      );
    }
    return (
      <>
        <p>{address}</p>
        <button className="btn-primary" onClick={() => disconnect()}>
          Disconnect Wallet
        </button>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h2>{connecting ? "Connecting..." : "Connect"} Solana</h2>
      {renderWalletContent()}
    </div>
  );
}
