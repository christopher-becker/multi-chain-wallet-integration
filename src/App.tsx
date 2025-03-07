import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import SolanaWallet from "./components/wallet/SolanaWallet";
import WagmiWallet from "./components/wallet/WagmiWallet";
import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

function App() {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <h1 className="text-4xl">multi-chain-wallet-integration</h1>
        <WagmiWallet />
        <SolanaWallet />
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
