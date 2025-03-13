import { useSolanaTokenBalance } from "../../core/hooks/useSolanaTokenBalance";
import { TokenType } from "../../core/types/liFi.types";

function SolanaBalanceDisplay({
  token,
  address,
}: {
  token: TokenType;
  address: string;
}) {
  const { isLoading, formattedPrice, formattedBalance } = useSolanaTokenBalance(
    token,
    address
  );

  if (isLoading) return <span className="pulse">Loading...</span>;

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

export default SolanaBalanceDisplay;
