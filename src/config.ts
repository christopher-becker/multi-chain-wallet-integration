import { http, createConfig } from "wagmi";
import {
  arbitrum,
  avalanche,
  bsc,
  mainnet,
  polygon,
  sepolia,
} from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, bsc, avalanche, arbitrum],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
    [avalanche.id]: http(),
    [arbitrum.id]: http(),
  },
});
