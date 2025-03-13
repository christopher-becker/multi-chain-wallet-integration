import { useBalance } from "wagmi";
import { Address, formatUnits } from "viem";
import { TokenType } from "../../core/types/liFi.types";
import { useMemo } from "react";
import { formatPrice } from "../../core/utils/formatPrice.util";

export function useEthTokenBalance(
  token: TokenType,
  address: Address | string
) {
  const isNative =
    token.address === "0x0000000000000000000000000000000000000000";

  const { data, isLoading } = useBalance({
    address: address as Address,
    token: isNative ? undefined : token.address,
    chainId: token.chainId,
  });

  const formattedBalance = useMemo(() => {
    if (!data?.value) return "0";
    return formatUnits(data.value, data.decimals);
  }, [data]);

  const formattedPrice = useMemo(() => {
    if (!data?.value || !token.priceUSD) return null;
    return formatPrice(Number(token.priceUSD) * Number(formattedBalance));
  }, [data, token.priceUSD, formattedBalance]);

  return { balance: data?.value, formattedBalance, formattedPrice, isLoading };
}
