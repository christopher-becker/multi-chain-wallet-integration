import { TOKEN_IMG_API } from "../constants/config.const";

export function getCoinIconUrl<
  T extends Partial<{ name: string; symbol: string }>
>(chain: T): string {
  if (!chain.name || !chain.symbol) return "";

  return `${TOKEN_IMG_API}/${chain.name.toLowerCase()}-${chain.symbol
    .toLowerCase()
    .replace("pol", "matic")}-logo.png`;
}
