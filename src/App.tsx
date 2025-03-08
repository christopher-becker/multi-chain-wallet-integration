import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { createMemoryRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "*", element: <NotFoundPage /> },
];

const router = createMemoryRouter(routes);

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
        <RouterProvider router={router} />
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
