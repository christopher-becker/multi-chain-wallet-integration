export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    type: "function",
  },
];

export const TOKENS = [
  {
    address: "",
    title: "Ethereum",
    symbol: "ETH",
    abi: ERC20_ABI,
  },
  {
    address: "0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF",
    title: "Immutable X",
    symbol: "IMX",
    abi: ERC20_ABI,
  },
  {
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    title: "DAI Stablecoin (POL)",
    symbol: "DAI",
    abi: ERC20_ABI,
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606e48c",
    title: "USDC Stablecoin",
    symbol: "USDC",
    abi: ERC20_ABI,
  },
  {
    address: "0x8f33f87f8a71f9ed1f5bd456c142e18394bb3436",
    title: "Scroll",
    symbol: "scl",
    abi: ERC20_ABI,
  },
  {
    address: "0xeeb5bfe545af04cf9864a0a507ff0944047a254c",
    title: "Blast",
    symbol: "bls",
    abi: ERC20_ABI,
  },
];
