import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { lazy, Suspense, useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { createBrowserRouter, RouterProvider } from "react-router";
import NotFoundPage from "./pages/NotFoundPage";

import { BitcoinWalletProvider } from "./core/context/BitcoinWallet.context";
import SuspensePage from "./pages/suspense-page/SuspensePage";

const HomePage = lazy(() => import("./pages/home-page/HomePage"));
const GetStartedPage = lazy(
  () => import("./pages/get-started-page/GetStartedPage")
);

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<SuspensePage />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/get-started",
    element: (
      <Suspense fallback={<SuspensePage />}>
        <GetStartedPage />
      </Suspense>
    ),
  },
  { path: "*", element: <NotFoundPage /> },
];

const router = createBrowserRouter(routes);

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
        <BitcoinWalletProvider>
          <RouterProvider router={router} />
        </BitcoinWalletProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
