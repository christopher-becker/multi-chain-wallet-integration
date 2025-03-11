type ChainFilterButtonProps = {
  title: string;
  chain: string;
  selectedChain: string;
  fetchChains: (chain?: string) => void;
  setSelectedChain: (chain: string) => void;
};

export default function ChainFilterButton(props: ChainFilterButtonProps) {
  const buttonClass = `btn-secondary ${
    props.selectedChain.toLowerCase() == props.chain.toLowerCase() &&
    "!bg-gray-100 !text-gray-800"
  }`;
  const handleOptionClick = () => {
    props.fetchChains(
      props.chain !== "all" ? props.chain.toUpperCase() : undefined
    );
    props.setSelectedChain(props.chain);
  };
  return (
    <>
      <button className={buttonClass} onClick={handleOptionClick}>
        {props.title}
      </button>
    </>
  );
}
