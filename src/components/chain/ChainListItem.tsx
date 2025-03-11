import { ChainType } from "../../core/types/liFi.types";
import { formatPrice } from "../../core/utils/formatPrice.util";

export default function ChainListItem(props: { chain: ChainType }) {
  return (
    <li className="flex gap-4 items-center">
      <img
        className="h-12 w-12 rounded-full"
        src={props.chain.logoURI}
        alt={props.chain.name}
        loading={"lazy"}
      />
      <div className="flex gap-2 w-full items-center">
        <div className="flex gap-0 sm:gap-2 flex-col sm:flex-row w-full">
          <span className="font-bold">{props.chain.name}</span>
          <span className="uppercase text-gray-500">{props.chain.coin}</span>
        </div>
        <span className="flex-1 text-right">
          {formatPrice(parseFloat(props.chain.nativeToken.priceUSD))}
        </span>
      </div>
    </li>
  );
}
