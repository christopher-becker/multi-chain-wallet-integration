import { LIFI_API } from "../core/constants/config.const";
import { LiFiChainsType } from "../core/types/liFi.types";

// spi.js
export async function getLiFiChains(optionalChainTypes: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(
      `${LIFI_API}/chains?chainTypes=${optionalChainTypes}`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: LiFiChainsType = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching chains:", err);
    throw err;
  }
}
