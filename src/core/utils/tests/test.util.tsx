import { render } from "@testing-library/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { config } from "../../../config";
import { BitcoinWalletProvider } from "../../context/BitcoinWallet.context";
import { BrowserRouter } from "react-router";
import { EthWalletProvider } from "../../context/EthereumWalletConnection.context";
import { SolanaWalletProvider } from "../../context/SolanaWalletConnection.context";

const queryClient = new QueryClient();
const network = WalletAdapterNetwork.Mainnet;
const endpoint = clusterApiUrl(network);
const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

// Custom wrapper to use with ViTest
export const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <EthWalletProvider>
              <SolanaWalletProvider>
                <BitcoinWalletProvider>
                  <BrowserRouter>{ui}</BrowserRouter>
                </BitcoinWalletProvider>
              </SolanaWalletProvider>
            </EthWalletProvider>
          </WalletProvider>
        </ConnectionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
