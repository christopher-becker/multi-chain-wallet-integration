import { Suspense } from "react";
import { TokenType } from "../../core/types/liFi.types";
import { Address } from "viem";
import { useChains } from "../../core/context/Chains.context";
import ImageWithFallback from "../image/image-with-fallback";
import { DefaultWalletImage } from "../image/app-images/AppImages";
import TokenBalanceDisplay from "../balances/TokenBalanceDisplay";
import { useEthTokenBalance } from "../../core/hooks/useTokenBalances";
import { useSolanaTokenBalance } from "../../core/hooks/useSolanaTokenBalance";

export default function ChainListItem(props: {
  token: TokenType;
  address: Address;
}) {
  const { selection } = useChains();

  const isEthereum = selection?.chain !== "BTC" && selection?.chain !== "SOL";
  const isSolana = selection?.chain === "SOL";

  return (
    <li className="group flex gap-4 items-center transition-all hover:cursor-pointer">
      {/* Token Image with fallback */}
      <ImageWithFallback
        className="h-12 w-12 rounded-full"
        src={props.token.logoURI}
        alt={props.token.name}
        fallbackSrc={DefaultWalletImage().props.src}
        loading={"lazy"}
      />
      {/* Token Details */}
      <div className="flex gap-2 w-full items-center group-hover:pl-1 transition-all">
        <div className="flex flex-1 gap-0 sm:gap-2 w-full items-center">
          <span className="font-bold flex flex-col sm:flex-row items-start sm:items-center gap-1">
            <span className="text-ellipsis line-clamp-1">
              {props.token.name}
            </span>
            <span className="uppercase text-gray-500 text-xs">
              ({props.token.symbol})
            </span>
          </span>
          {/* Token Balance */}
          <div className="flex-1 text-right">
            <Suspense fallback={<span>Loading...</span>}>
              {isEthereum && selection?.address && (
                <TokenBalanceDisplay
                  token={props.token}
                  address={selection?.address}
                  useTokenBalanceHook={useEthTokenBalance}
                />
              )}
              {isSolana && selection?.address && (
                <TokenBalanceDisplay
                  token={props.token}
                  address={selection?.address}
                  useTokenBalanceHook={useSolanaTokenBalance}
                />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </li>
  );
}
