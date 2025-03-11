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
];
