import { useState } from "react";

export const useUtxoWallet = () => {
  const [utxoAddress, _] = useState();
  return { utxoAddress };
};
