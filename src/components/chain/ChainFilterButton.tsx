import { ConnectionType } from "../../core/types/connection.types";

type ChainFilterButtonProps = {
  title?: string;
  chain: ConnectionType;
  selectedChain?: { chain: string; address?: string } | null;
  setSelectedChain: (chain: ConnectionType) => void;
};

export default function ChainFilterButton({
  title,
  chain,
  selectedChain,
  setSelectedChain,
}: ChainFilterButtonProps) {
  const isSelected =
    selectedChain?.chain?.toLowerCase() === chain?.symbol?.toLowerCase();

  const buttonClass = `btn-secondary ${
    isSelected && "!bg-gray-100 !text-gray-800"
  }`;

  const handleOptionClick = () => {
    if (chain && chain.address) {
      setSelectedChain(chain);
    }
  };

  return (
    <button className={buttonClass} onClick={handleOptionClick}>
      {title}
    </button>
  );
}
