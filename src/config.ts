import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask()],
  transports: {
    // mainnet
    [mainnet.id]: http(),
    // testing chain
    [sepolia.id]: http(),
  },
});
