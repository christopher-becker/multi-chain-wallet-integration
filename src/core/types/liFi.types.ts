type NativeCurrencyType = {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  chainId: number;
};

type MetamaskType = {
  chainId: string;
  blockExplorerUrls: string[];
  chainName: string;
  nativeCurrency: NativeCurrencyType;
  rpcUrls: string[];
};

export type ChainType = {
  chainType: string;
  coin: string;
  diamondAddress: string;
  id: number;
  key: string;
  logoURI: string;
  mainnet: boolean;
  metamask: MetamaskType;
  multicallAddress: string;
  name: string;
  nativeToken: NativeCurrencyType;
  permit2: string;
  permit2Proxy: string;
  relayerSupported: boolean;
  tokenlistUrl: string;
};

export type LiFiChainsType = {
  chains: ChainType[];
};
