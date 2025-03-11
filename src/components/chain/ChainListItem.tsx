import { Address } from "viem";
import { TOKENS } from "../../core/constants/tokens.const";
import { ChainType } from "../../core/types/liFi.types";
import { TokenBalanceDisplay } from "../TokenBalances";

export default function ChainListItem(props: { chain: ChainType }) {
  const foundTokenInTokens = TOKENS.find(
    (token) => token.symbol.toLowerCase() === props.chain.key.toLowerCase()
  );
  return (
    <li className="flex gap-4 items-center">
      <img
        className="h-12 w-12 rounded-full"
        src={props.chain.logoURI}
        alt={props.chain.name}
        loading={"lazy"}
      />
      <div className="flex gap-2 w-full items-center">
        <div className="flex flex-1 gap-0 sm:gap-2 flex-col sm:flex-row w-full">
          <span className="font-bold">{props.chain.name}</span>
          <span className="uppercase text-gray-500">{props.chain.coin}</span>
        </div>
        <TokenBalanceDisplay
          token={
            foundTokenInTokens
              ? {
                  ...foundTokenInTokens,
                  address: foundTokenInTokens.address as Address,
                }
              : null
          }
        />
      </div>
    </li>
  );
}
