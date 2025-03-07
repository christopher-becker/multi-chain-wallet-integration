import { formatEther } from "viem";
import { useWalletConnection } from "../../core/hooks/useWalletConnection";

export default function WalletBalance() {
  const { balance } = useWalletConnection();
  if (balance.isLoading) return <>Fetching balance ...</>;
  if (balance.error) return <>Error fetching balance.</>;
  const formattedBalance = balance.data?.value
    ? formatEther(balance.data.value)
    : "0";
  return <p>Balance: {formattedBalance} ETH</p>;
}
