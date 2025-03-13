import { Address } from "viem";

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

type NativeTokenType = {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI: string;
  priceUSD: string;
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
  nativeToken: NativeTokenType;
  permit2: string;
  permit2Proxy: string;
  relayerSupported: boolean;
  tokenlistUrl: string;
};

export type LiFiChainsType = {
  chains: ChainType[];
};

export type TokenType = {
  chainId: number;
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  priceUSD: string;
  coinKey: string;
  logoURI: string;
};

export type TokensResponseType = {
  tokens: {
    [chainId: number]: TokenType[];
  };
};
