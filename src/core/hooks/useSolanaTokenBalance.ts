import { useEffect, useState, useMemo } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { formatPrice } from "../../core/utils/formatPrice.util"; // Ensure you have this function
import { TokenType } from "../types/liFi.types";
import { SOLANA_API } from "../constants/config.const";

const connection = new Connection(SOLANA_API);

async function fetchSolanaBalance(
  token: string,
  ownerAddress: string
): Promise<string> {
  try {
    const ownerPublicKey = new PublicKey(ownerAddress);
    const tokenPublicKey = new PublicKey(token);

    // Check if the token is the native SOL token (system account)
    if (token === "11111111111111111111111111111111") {
      const balance = await connection.getBalance(ownerPublicKey);
      const formattedBalance = balance / LAMPORTS_PER_SOL;
      return formattedBalance.toString();
    }

    // Get Account
    const tokenAccount = await getAssociatedTokenAddress(
      tokenPublicKey,
      ownerPublicKey
    );

    // Fetch balance
    const accountInfo = await getAccount(connection, tokenAccount);
    return accountInfo.amount.toString();
  } catch (error) {
    return "0";
  }
}

export function useSolanaTokenBalance(
  token: TokenType,
  address: string | undefined
) {
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!token || !address) return;

    const loadBalance = async () => {
      setIsLoading(true);
      try {
        const bal = await fetchSolanaBalance(token.address, address);
        setBalance(bal);
      } catch (err) {
        setBalance("0");
      } finally {
        setIsLoading(false);
      }
    };

    loadBalance();
  }, [token, address]);

  const formattedPrice = useMemo(() => {
    if (!balance || balance === "0" || !token?.priceUSD) return null;
    return formatPrice(Number(token.priceUSD) * Number(balance));
  }, [balance, token]);

  return { formattedBalance: balance, formattedPrice, isLoading };
}
