import { useSolanaWalletConnection } from "../../core/hooks/useSolanaWalletConnection";

export default function SolanaWallet() {
  const { connectWallet, disconnect, isConnected, address, wallets } =
    useSolanaWalletConnection();

  const renderWalletContent = () => {
    if (!isConnected) {
      return (
        <>
          {wallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              onClick={() => connectWallet(wallet.adapter.name)}
              type="button"
              className="btn-primary"
            >
              {wallet.adapter.name}
            </button>
          ))}
        </>
      );
    }
    return (
      <div className="flex flex-col gap-4">
        <p>{address}</p>
        <button className="btn-primary" onClick={() => disconnect()}>
          Disconnect Wallet
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2>Solana</h2>
      {renderWalletContent()}
    </div>
  );
}
