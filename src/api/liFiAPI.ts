import { LIFI_API } from "../core/constants/config.const";
import { TokensResponseType } from "../core/types/liFi.types";

export async function getChainTokens(optionalChainTypes: string) {
  try {
    const response = await fetch(
      `${LIFI_API}/tokens?chains=${optionalChainTypes}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data: TokensResponseType = await response.json();
    return data;
  } catch (err) {
    throw Error("Unable to fetch token list.");
  }
}
