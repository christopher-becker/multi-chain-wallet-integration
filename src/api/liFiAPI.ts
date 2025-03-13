import { LIFI_API } from "../core/constants/config.const";
import { TokensResponseType } from "../core/types/liFi.types";

export async function getChainTokens(optionalChainTypes: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(
      `${LIFI_API}/tokens?chains=${optionalChainTypes}`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: TokensResponseType = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching chains:", err);
    throw err;
  }
}
