import { useEffect, useState } from "react";
import { Address, getAddress } from "viem";
import { useAccount, usePublicClient } from "wagmi";

type Token = {
  address: Address;
  abi: any[];
  symbol: string;
};

export function useTokenBalance(token: Token | null) {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [balance, setBalance] = useState<bigint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address || !publicClient || !token) return;

    const fetchBalance = async () => {
      setLoading(true);
      try {
        let balance = BigInt(0);

        if (token.symbol === "ETH") {
          balance = await publicClient.getBalance({ address });
        } else {
          const checksumAddress = getAddress(token.address);
          const result = await publicClient.readContract({
            address: checksumAddress,
            abi: token.abi,
            functionName: "balanceOf",
            args: [address],
          });

          balance = Array.isArray(result) ? BigInt(result[0]) : BigInt(result);
        }

        setBalance(balance);
      } catch (error) {
        console.error(`Failed to fetch balance for ${token?.address}:`, error);
        setBalance(BigInt(0));
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [address, publicClient, token]);

  return { balance, loading };
}
