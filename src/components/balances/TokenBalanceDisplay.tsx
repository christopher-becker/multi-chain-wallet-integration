import { Address } from "viem";
import { TokenType } from "../../core/types/liFi.types";
import { formatPrice } from "../../core/utils/formatPrice.util";

type TokenBalanceHookType = {
  (token: TokenType, address: Address | string): {
    formattedBalance: string | null;
    formattedPrice: string | null;
    isLoading: boolean;
  };
};

export default function TokenBalanceDisplay({
  token,
  address,
  useTokenBalanceHook,
}: {
  token: TokenType;
  address: Address | string;
  useTokenBalanceHook: TokenBalanceHookType;
}) {
  const { formattedBalance, formattedPrice, isLoading } = useTokenBalanceHook(
    token,
    address
  );

  if (isLoading) return <span className="animate-pulse">Loading...</span>;

  return (
    <div className="flex flex-col">
      <span>{formatPrice(Number(formattedBalance))}</span>
      {formattedPrice && (
        <span className="uppercase text-gray-500 text-xs">
          ${formattedPrice}
        </span>
      )}
    </div>
  );
}
