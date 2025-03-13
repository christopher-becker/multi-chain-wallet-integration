import { Address } from "viem";
import { TokenType } from "../../core/types/liFi.types";
import { useEthTokenBalance } from "../../core/hooks/useTokenBalances";

export default function EthBalanceDisplay({
  token,
  address,
}: {
  token: TokenType;
  address: Address;
}) {
  const { formattedBalance, formattedPrice, isLoading } = useEthTokenBalance(
    token,
    address
  );

  if (isLoading) return <span className="animate-pulse">Loading...</span>;

  return (
    <div className="flex flex-col">
      <span>{formattedBalance}</span>
      {formattedPrice && (
        <span className="uppercase text-gray-500 text-xs">
          ${formattedPrice}
        </span>
      )}
    </div>
  );
}
