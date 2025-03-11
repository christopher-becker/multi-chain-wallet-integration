import { Address, formatEther } from "viem";
import { useTokenBalance } from "../core/hooks/useTokenBalances";
import { formatPrice } from "../core/utils/formatPrice.util";
import { useMemo } from "react";

type TokenBalanceDisplayProps = {
  token:
    | {
        address: Address;
        abi: any[];
        symbol: string;
      }
    | null
    | undefined;
};

export function TokenBalanceDisplay({ token }: TokenBalanceDisplayProps) {
  if (!token) return <span className="text-gray-500 text-xs">No Contract</span>;

  const { balance, loading } = useTokenBalance(token);

  const formattedBalance = useMemo(() => {
    return balance ? formatPrice(parseFloat(formatEther(balance))) : null;
  }, [balance]);

  return (
    <>
      {loading ? (
        <span className="flex-1 text-right">
          <span className="rounded animate-pulse">Balance ...</span>
        </span>
      ) : (
        <span className="flex-1 text-right pulse">
          {balance ? (
            formattedBalance
          ) : (
            <span className="text-gray-200 text-xs">No Balance</span>
          )}
        </span>
      )}
    </>
  );
}
